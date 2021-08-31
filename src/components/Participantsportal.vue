<template>
  <div class="events">
    <v-container class="py-6 my-2 grey lighten-3 card-overflow">
          <v-layout row wrap inline-block justify-center>
            <v-flex xs12 sm12 md12>
              <h1 class="text-center"> {{dbName}} </h1>
            </v-flex>
              <v-flex xs12 sm8 md6 v-for="event in eventTitle" :key="event.id">
                <v-card class="ma-2 card-overflow"  height="300" >
                <v-card-title> {{event.title}} </v-card-title>
                <v-simple-table>
                  <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Phone Number</th>
                    <th class="text-left">Confirmed</th>
                  </tr>
                </thead>
                <tbody v-for="participant in event.participants" :key="participant.id" :class="participant.colorClass">
                  <tr>
                    <td>{{participant.name}}</td>
                    <td>{{participant.email}}</td>
                    <td>{{participant.phone}}</td>
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



</template>

<script>
import fb from '@/fb'
import { saveAs } from 'file-saver';
export default{
  props:{
    dbName:
    {
      type: String,
      required: true
    }
  },
  data(){
    return{
      eventTitle: [],
      eventAtt: []
    }
  },
  methods:
  {
    download: function(save, title)
    {
      var x = ""
      var file = []
      for(x of save)
      {
        file.push({
          name: x.name,
          phone: x.phone,
          email: x.email
        })
      }
      var blob = new Blob([JSON.stringify(file)], {
        type: "text/plain;charset=utf-8"
      });
      saveAs(blob, title +"-participants.txt");
    }
  },
  created()
  {

    fb.db.collection(this.dbName).get().then((snapshot) =>
    {
      console.log(this.dbName)
      var items = snapshot.docs;
        items.forEach(item =>
        {
              /*this.eventTitle.push({
                title: item.data().title,
                id: item.id
              })*/

              fb.db.collection(this.dbName).doc(item.id).collection('participants').get().then((snapshot) =>
              {
                var Attendance = snapshot.docs;
                Attendance.forEach(Attendee =>
                {
                  console.log(Attendee.data())
                  if(Attendee.data().confirmation == true)
                  {
                    this.eventAtt.push(
                      {
                        id: Attendee.id,
                        name: Attendee.data().name,
                        email: Attendee.data().email,
                        phone: Attendee.data().phone,
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
                          Confirmed: Attendee.data().confirmation,
                          colorClass: 'not-confirmed'
                        })
                    }
                  }
                })
                this.eventTitle.push({
                  title: item.data().title,
                  id: item.id,
                  participants: this.eventAtt
                })
                  this.eventAtt = []
              })


        })


      })
  },

}
</script>
<style scoped>
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
</style>
