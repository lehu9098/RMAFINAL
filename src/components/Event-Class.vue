<template>
  <div class="classes">
    <v-container class="py-1">
          <v-layout row wrap inline-block justify-center>
              <v-flex xs12 sm12 md12>
                <v-card flat tile class="pa-4 Align text-uppercase" style="border-top: 1px solid black; border-bottom: 1px solid black;">
                  <h2>Upcoming {{eventName}}</h2>
                </v-card>
              </v-flex>
              <v-flex xs12 sm8 md6 id="about" v-for="(evt, i) in eventInfo" :key="evt.id" >
                <v-card  flat tile class="ma-2 border-thing card-overflow" max-height="800" scrollable>
                  <v-img class=" align-end" height="400" :src="evt.image">
                      <v-overlay value="true" absolute>
                        <h2 class="text-center pt-2">{{evt.title}}</h2>
                      </v-overlay>
                  </v-img>
                  <v-card-text> <b>Description:</b> {{evt.description}} </v-card-text>
                  <v-card-text><b> Date: </b>{{evt.dateFormatted}} </v-card-text>
                  <v-card-text v-if="evt.noSlot"> <b>Time: </b>{{evt.timeFormatted[0]}}</v-card-text>
                  <v-card-text v-if="!evt.noSlot">
                    <b>Time Slots: </b>
                    <ul v-for="(slot, index) in evt.timeFormatted" :key="index">
                      <li>
                        {{slot}}
                      </li>
                    </ul>
                  </v-card-text>
              <v-card-text v-if="evt.capacity != 0" class="green--text"> <b>Available Spots: </b>{{evt.capacity}}</v-card-text>
                  <v-card-text v-if="evt.capacity == 0" class="red--text"> <b>Available Spots: </b>This Class Is Full</v-card-text>
              <v-alert type="success" v-if="evt.success">
                You successfully signed up for {{evt.title}}. A shop employee will contact you to confirm your attendance.
                <v-btn text v-on:click="evt.success = false"><v-icon class="font-weight-light">close</v-icon></v-btn>
              </v-alert>
              <v-btn block text @click="evt.show = !evt.show" v-if="evt.capacity != 0"> Sign Up  <v-icon> expand_more </v-icon></v-btn>
                <v-expand-transition>
                  <div v-show="evt.show">
                  <v-form class="pa-6">
                    <v-divider></v-divider>
                    <v-text-field label="Enter Name" v-model="Name"></v-text-field>
                    <v-text-field label="Enter Email" v-model="Email"></v-text-field>
                    <v-text-field label="Enter Phone Number" v-model="phoneN"></v-text-field>
                    <v-checkbox v-if="showCheckBox" type="checkbox" label="Do you need to reserve a vise and tools?" v-model="BAB.Tools"></v-checkbox>
                    <v-checkbox v-if="showCheckBox" type="checkbox" label="Have you tied flies before?" v-model="BAB.TiedBefore"></v-checkbox>
                    <v-btn text block class="button-img grey" v-on:click="addParticipant(i, evt.id)"> Sign Up</v-btn>
                  </v-form>
                  </div>
                </v-expand-transition>
                </v-card>
              </v-flex>
          </v-layout>



    </v-container>
    </div>
</template>

<script>
import fb from '@/fb'

export default
{
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
    eventName:
    {
      type: String,
      required: true
    },
    about:
    {
      type: String,
      required: true
    }
  },
    data(){
      return{
        BAB: {
          Tools: false,
          TiedBefore: false,
        },
        showCheckBox: false,
        emails: [],
        eventInfo: [],
        shower: false,
        currentID: "",
        admin: true,
        phoneN: '',
        Email: '',
        Name: '',
        images: [
          {src: '../img/Brown.jpg'},
          {src: '../img/Leo.jpg'},
          {src: '../img/troutskin.png'}
        ],
        show: true
        }
    },
    methods:{
      addParticipant: function(i, id)
      {
        let participant = {name: this.Name, email: this.Email, phone: this.phoneN, confirmation: false};
        //if show box is true its bugs and brews so add extra questions to the firsbase call.
        if(this.showCheckBox)
        {
           participant.BAB = this.BAB;
        }
        console.log(participant)
  
        fb.db.collection(this.dbName).doc(id).collection('participants').add(participant).then((docRef) =>
        {
            console.log(docRef);
            this.shower = true;
            this.eventInfo[i].show = false;
            this.eventInfo[i].success = true;
        })
      },
      timeFormatted: function(time)
      {
        var timeFormatted;
        var timeCheck = time.slice(0, 2)
        if(timeCheck <= 12)
        {
          if(timeCheck >= 10 && timeCheck < 12)
          {
            timeFormatted = time.slice(0, 5) + " AM";
          }
          else if(timeCheck == 12)
          {
            timeFormatted = time.slice(0, 5) + " PM";
          }
          else {
            timeFormatted = time.slice(1, 5) + " AM";
          }

        }
        else{
          timeFormatted =  (timeCheck-12) + time.slice(2, 5) + " PM";
        }
        return timeFormatted;
      }
    },
    created()
    {
      if(this.dbName === 'BugsandBrews'){
        this.showCheckBox = true;
      }
                                  //res takes response of snapshot as a function parameter
      fb.db.collection(this.dbName).orderBy("date").orderBy("time", "asc").onSnapshot(res => { //onSnapshot takes a screen shot of the updated db after a change has occured
        const changes = res.docChanges(); //the speific pieces of any document that was changed at that instance
        //const date1 = changes[0].doc.data().date;

        const today = new Date();
        const date = today.getFullYear()+'-'+ '0' +(today.getMonth()+1)+'-'+ '0' +today.getDate(); //Date.parse pasres date string to be compared
        if(changes.length === 0)
        {
          this.show = false;
        }
        else
        {
          changes.forEach(change =>
          {
            if(Date.parse(change.doc.data().date) < Date.parse(date) )
            {
                /*console.log(change.doc.data().date)
                console.log(Date.parse(date))
                console.log(Date.parse(change.doc.data().date))*/
                fb.db.collection(this.dbName).doc(change.doc.id).delete().then(()=>
                {
                    console.log("Deleted from DB");

                })


            }
            else{

            var day = parseInt(change.doc.data().date.slice(8, 10));
            //console.log((today.getMonth()+1), parseInt(change.doc.data().date.slice(5, 7)), today.getDate(), day, change.doc.data().reminderSend);
            if((today.getMonth()+1) == parseInt(change.doc.data().date.slice(5, 7)) && (day - today.getDate()) <= 2 && change.doc.data().reminderSend == false){ //If month is equal and day is within 2 days of event and reminderSend has not been sent
              console.log("Hello")
             fb.db.collection(this.dbName).doc(change.doc.id).collection('participants').where("confirmation", "==", true).get().then((snapshot) => { //Get emails from participants
                snapshot.docs.forEach((doc) => {
                  this.emails.push(doc.data().email);
                })
              }).then(() => {
                var timeFormed = this.timeFormatted(change.doc.data().time);
                const sendReminder = fb.functions.httpsCallable('sendReminder');
                sendReminder({emails: this.emails, date: change.doc.data().date, time: timeFormed,  title: change.doc.data().title}).then(() => {

                }).then(()=> {
                  fb.db.collection(this.dbName).doc(change.doc.id).set({reminderSend: true},{merge: true});
                });
              })
              //send Email reminders and set reminderSend to true so it wont run again


            }

              if(change.type === 'added') { //change.type is a built in property can either be deleted added modified
              //var d = change.doc.data().date;
              const month = ["January", "February", "March", "April", "May",  "June", "July", "August", "September", "October", "November", "December"];
              const week = [ "Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"]

              //var d = Date.parse(change.doc.data().date + ' GMT')

              var nd = new Date(change.doc.data().date.replace(/-/g, '/')); //Replace changes - with / so we can get the proper date
              //console.log(nd, change.doc.data().date)
              var dateFormatted = week[nd.getDay()] + ", " + month[nd.getMonth()] + " " + nd.getDate();

              var timeFormatted = [];
              var noSlot;
              //var timeCheck = change.doc.data().time.slice(0, 2)
              change.doc.data().time.forEach((slot) => {
                timeFormatted.push(this.timeFormatted(slot))
              })
              if(timeFormatted.length == 1){
                 noSlot = true;
              }
              if(timeFormatted.length > 1){
                noSlot = false;
              }
              //var timeFormatted = this.timeFormatted(change.doc.data().time);
              this.eventInfo.push(
                { //brackets are because we are pushing a object onto the array
                  ...change.doc.data(), //gets us each individual changes docuement data.
                  id: change.doc.id,
                  show: false,
                  dateread: nd,
                  timeFormatted: timeFormatted,
                  dateFormatted: dateFormatted,
                  noSlot: noSlot,
                  success: false,
                }) ///So REason added works is becuase when the page is first loaded up it treats all existing elemets as added elements
              }


            }
          })
        }
      })

      //if a user is signed in populate the sign in with their information
      fb.auth.onAuthStateChanged(user => {
        if(user)
        {

          fb.db.collection('users').doc(user.uid).get().then((snapshot) =>
          {
            this.Name = snapshot.data().fullName
            this.phoneN = snapshot.data().phoneNumber
            this.Email = user.email
          })
        }
    })
  }
}
</script>
<style scoped>
.card-overflow
{
  overflow: scroll;
}

.border-thing
{
  border-top: 2px solid grey;
  border-bottom: 3px solid grey;
}
.Align
{
  text-align: center;
}

</style>
