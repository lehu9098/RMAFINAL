<template>
  <v-container>
      <v-layout justify-center>
        <v-flex xs12 sm12 md12>
          <v-alert type="success" v-if="success"> You were succesfully removed from the selected event. Refresh the page to see changes</v-alert>
          <v-alert type="success" v-if="shower"> You were sent a verification email. Click the link there to confirm your attendance.<v-btn text v-on:click="shower = false"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
          <v-card class="text-center ma-4 pa-4" tile flat outlined>
          <h1 style="text-align: center;" class="mb-2">My {{Name}}</h1>
          <v-simple-table>
              <template v-slot:default>
            <thead>

              <tr>
                <th class="text-left">{{Name}} Name</th>
                <th class="text-left">time</th>
                <th class="text-left">Date</th>
                <th class="text-left">Verification Status</th>
                <th class="text-left">Resend Email Verification</th>
                <th class="text-left">Unconfirm Attendance</th>
              </tr>
            </thead>
            <tbody v-for="event in myEvents" :key="event.date" :class="event.colorClass">
              <tr>
                <td>{{event.title}}</td>
                <td>{{event.time}}</td>
                <td>{{event.date}}</td>
                <td>{{event.confirmed}}</td>
                <td><v-btn block text v-on:click="send(event)"><v-icon class="font-weight-light">email</v-icon></v-btn></td>
                <td  v-if="event.confirmed == true"><v-btn block text v-on:click="Unconfirm(event)"><v-icon class="font-weight-light">close</v-icon></v-btn></td>
              </tr>
            </tbody>
          </template>
          </v-simple-table>
        </v-card>
        </v-flex>
      </v-layout>
  </v-container>

</template>
<script>
import fb from '@/fb'
export default{
  props:{
    dbName:
    {
      type: String,
      required: true
    },
    subdbName:
    {
      type: String,
      required: true
    },
    Name:
    {
      type: String,
      required: true
    }
  },
  data() {
    return{
      name: '',
      myEvents: [],
      confirmation: [],
      shower: false,
      success: false

    }
  },
  methods:
  {
    Unconfirm: function(event)
    {
      console.log(event.dbName)
      console.log(this.dbName)
      var ID = fb.auth.currentUser.uid;
      fb.db.collection('users').doc(ID).collection(this.subdbName).doc(event.eventID).update({confirmation: false}).then(()=>
        {
            console.log('You successfully updated your attandance');
            //this.success = true
        }).then(() => {  fb.db.collection(event.dbName).doc(event.eventID).collection('participants').doc(ID).set({confirmation: false}, {merge: true})})
        fb.db.collection(event.dbName).doc(event.eventID).get().then((doc)=>{
          let newCapacity = doc.data().capacity + 1; //downsizes capacity by 1;
          fb.db.collection(event.dbName).doc(event.eventID).set({capacity: newCapacity}, {merge: true})
        }).then(() => {
            window.location.reload();
        })

    },
    send: function(event){
      var ID = fb.auth.currentUser.uid;
      var email = fb.auth.currentUser.email;
      const sendEventConfirmation = fb.functions.httpsCallable('sendEventConfirmation');
      sendEventConfirmation({email: email, id: ID, dbName: event.dbName, eventID: event.eventID, eventDate: event.date, eventTime: event.time}).then((result) => {
        console.log(result);
        this.shower = true;

      })
    }
  },
  created() //Events should delete when past so make sure that works and we wont need a test case for that
  {
    fb.auth.onAuthStateChanged(user => {
      var ID = fb.auth.currentUser.uid;

      if(user)
      {
        fb.db.collection('users').doc(ID).collection(this.subdbName).get().then((snapshot) =>
      {

          snapshot.docs.forEach(doc =>
          {

            const today = new Date();
            const eventD = new Date(doc.data().date.replace(/-/g, '/'))
            if(Date.parse(eventD) < Date.parse(today))
            {
              fb.db.collection('users').doc(ID).collection(this.subdbName).doc(doc.id).delete().then(()=>
              {
                  console.log("Deleted from DB");

              })
            }
            else{


              if(doc.data().confirmation == true)
                {
                  this.myEvents.push({
                    dbName: doc.data().dbName,
                    title: doc.data().EventName,
                    date: doc.data().eventDate,
                    time: doc.data().eventTime,
                    confirmed: doc.data().confirmation,
                    eventID: doc.id,
                    colorClass: 'confirmed'
                    })
                }
                else{
                  this.myEvents.push({
                    dbName: doc.data().dbName,
                    title: doc.data().EventName,
                    date: doc.data().eventDate,
                    time: doc.data().eventTime,
                    confirmed: doc.data().confirmation,
                    eventID: doc.id,
                    colorClass: 'not-confirmed'
                    })
                }
              }

          })
        })
       }
      })
    }

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
</style>
