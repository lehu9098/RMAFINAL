<template>
  <v-container class="white events">
      <v-select class="grey lighten-3 pa-3" outlined :items="eventList" label="Select a Event-Class Section" v-model="dbName" @input="getData"></v-select>
  <div class="events" v-if="showEvent">
    <v-container class="py-6 my-2 grey lighten-3 card-overflow">
          <v-layout row wrap inline-block justify-center>
            <v-flex xs12 sm12 md12>
              <h1 class="text-center"> {{dbName}} </h1>
            </v-flex>
              <v-flex xs12 sm10 md10 v-for="event in eventTitle" :key="event.id">
                <v-card class="ma-2 card-overflow"  height="300" >
                <v-card-title> {{event.title}} / {{event.date}}</v-card-title>
                <v-simple-table>
                  <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Phone Number</th>
                    <th v-if="isBAB" class="text-left">Has Tied Before</th>
                    <th v-if="isBAB" class="text-left">Needs Tool/Vise</th>
                    <th class="text-left">Confirmed</th>
                  </tr>
                </thead>
                <tbody v-for="participant in event.participants" :key="participant.id" :class="participant.colorClass">
                  <tr>
                    <td>{{participant.name}}</td>
                    <td>{{participant.email}}</td>
                    <td>{{participant.phone}}</td>
                    <td v-if="isBAB">{{participant.BAB ? participant.BAB.TiedBefore : "NA"}}</td>
                    <td v-if="isBAB">{{participant.BAB ? participant.BAB.Tools : "NA"}}</td>
                    <td><v-checkbox type="checkbox" v-model="participant.Confirmed" v-on:click="updateConfirmation(dbName, event.id, participant)"></v-checkbox></td>
                  </tr>

                </tbody>
              </template>
                </v-simple-table>
                <v-btn text block v-on:click="download(event.participants, event.title)">Download Participants</v-btn>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
        <div class="events" v-if="showKC">
          <v-container class="py-6 my-2 grey lighten-3 card-overflow">
                <v-layout row wrap inline-block justify-center>
                  <v-flex xs12 sm12 md12>
                    <h1 class="text-center"> {{dbName}} </h1>
                  </v-flex>
                    <v-flex xs12 sm12 md12 v-for="event in eventTitle" :key="event.id">
                      <v-card class="ma-2 card-overflow"  height="300" >
                      <v-card-title> {{event.title}} </v-card-title>
                      <v-simple-table>
                        <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Parent Name</th>
                          <th class="text-left">Parent Email</th>
                          <th class="text-left">Parent Phone Number</th>
                          <th class="text-left">Child Name</th>
                          <th class="text-left">Child Age</th>
                          <th class="text-left">Child Health Conditions</th>
                          <th class="text-left">Confirmed</th>
                        </tr>
                      </thead>
                      <tbody v-for="participant in event.participants" :key="participant.id" :class="participant.colorClass">
                        <tr>
                          <td>{{participant.parentName}}</td>
                          <td>{{participant.parentEmail}}</td>
                          <td>{{participant.parentPhone}}</td>
                          <td>{{participant.childName}}</td>
                          <td>{{participant.childAge}}</td>
                          <td>{{participant.healthConditions}}</td>
                          <td>{{participant.Confirmed}}</td>
                        </tr>

                      </tbody>
                    </template>
                      </v-simple-table>
                      <v-btn text block v-on:click="download(event.participants, event.title)">Download Participants</v-btn>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>
    </v-container>



</template>
<script>
import fb from '@/fb'
import { saveAs } from 'file-saver';
import { parse } from 'json2csv';
//import portal from '../components/Participantsportal.vue'
//import KCportal from '../components/KCParticipationPortal.vue'
export default{
  data(){
    return{
      dbName: "",
      eventList: ["BugsandBrews", "IntroClasses", "TyingClasses",  "CreekCleanup",  "FishAlongs", "otherEvents", "otherClasses"],
      eventTitle: [],
      eventAtt: [],
      showKC: false,
      showEvent: false,
      isBAB: false,
    }
  },
  methods:
  {
    updateConfirmation: function(dbName, eventID, participant){

      fb.db.collection(dbName).doc(eventID).collection('participants').doc(participant.id,).set({confirmation: participant.Confirmed}, {merge: true}).then(() => {
        let event = this.eventTitle.find(x => x.id == eventID)
        let changedParticipant = event.participants.find(x => x.id == participant.id);
        changedParticipant.colorClass = participant.Confirmed ? 'confirmed' : 'not-confirmed';
        event.capacity = participant.Confirmed ? event.capacity - 1 : event.capacity + 1;
        fb.db.collection(dbName).doc(eventID).set({capacity: event.capacity}, {merge: true})
      })
    },
    download: function(save, title)
    {
      const fields = ['name', 'phone', 'email', 'confirmed'];
      console.log(this.dbName);
      if(this.dbName === 'BugsandBrews'){
        fields.push('Tools');
        fields.push('TiedBefore')
      }
      const opts = { fields };
      var x = ""
      var file = []
      for(x of save)
      {
        let participant = {
          name: x.name,
          phone: x.phone,
          email: x.email,
          confirmed: x.Confirmed
        };
        if(this.dbName === 'BugsandBrews'){
          participant.Tools = x.BAB ? x.BAB.Tools : "NA";
          participant.TiedBefore = x.BAB ? x.BAB.TiedBefore : "NA";
        }
        file.push(participant)
      }
      try {
        const csv = parse(file, opts);
        var blob = new Blob(["\ufeff", csv]);
        saveAs(blob, title +"-participants.csv");
      } catch (err) {
        console.error(err);
      }
      
    },


    getData: function(){
      this.eventTitle = [];
      this.eventAtt = [];
      if(this.dbName === 'BugsandBrews'){
        this.isBAB = true;
      }
      fb.db.collection(this.dbName).get().then((snapshot) =>
      {
        //console.log(this.dbName)
        var items = snapshot.docs;
          items.forEach(item =>
          {
                fb.db.collection(this.dbName).doc(item.id).collection('participants').get().then((snapshot) =>
                {
                  var Attendance = snapshot.docs;
                  Attendance.forEach(Attendee =>
                  {
                    //console.log(Attendee.data())
                    if(Attendee.data().confirmation == true)
                    {
                      this.eventAtt.push(
                        {
                          id: Attendee.id,
                          name: Attendee.data().name,
                          email: Attendee.data().email,
                          phone: Attendee.data().phone,
                          BAB: Attendee.data().BAB ? Attendee.data().BAB : null,
                          Confirmed: Attendee.data().confirmation,
                          colorClass: 'confirmed'
                        })
                    }
                    else {
                      {
                        this.eventAtt.push(
                          {
                            id: Attendee.id,
                            name: Attendee.data().name,
                            email: Attendee.data().email,
                            phone: Attendee.data().phone,
                            BAB: Attendee.data().BAB ? Attendee.data().BAB : null,
                            Confirmed: Attendee.data().confirmation,
                            colorClass: 'not-confirmed'
                          })
                      }
                    }
                  })
                  //console.log(item.data());
                  this.eventTitle.push({
                    title: item.data().title,
                    id: item.id,
                    participants: this.eventAtt,
                    date: item.data().date,
                    capacity: item.data().capacity
                  })
                    this.eventAtt = []
                })


          })
          this.showKC = false;
          this.showEvent = true;
        })

  }
  }
}
</script>
<style scoped>
.centered
{
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirmed
{
  color: green;
}
.not-confirmed
{
  color: red;
}
.card-overflow
{
  overflow: scroll;

}
.float{
  position: absolute;
  bottom: 0;
}

</style>
