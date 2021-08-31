<template>
  <v-container>
  <v-layout row justify-center>
    <v-flex xs10 sm10 md10>
      <v-alert type="success" v-if="showSuccess"> You successfully edited {{name}}!<v-btn text v-on:click="refresh()"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
      <v-alert type="warning" v-if="showError"> {{error}}</v-alert>
      <v-card>
        <h3 style="text-align:center;" class="pa-3">Update Event</h3>
        <v-select class="pa-3" outlined :items="eventList" label="Select a Event-Class Section" v-model="dbName" @input="getDocs()"></v-select>
        <div v-if="show" class="pa-3">
        <v-select class="pa-3" outlined :items="docsList" label="Select the Event-Class to Modify" v-model="name" @input="getPost()"></v-select>
        <label> Change Capacity: </label>
        <v-text-field outlined v-model="capacity"></v-text-field>
        <label> Change Description: </label>
        <v-textarea outlined v-model="description"></v-textarea>
        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="date"
        transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field outlined v-model="date" label="Select Date" prepend-icon="event" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title type="date"> <!--can add scrollable-->
            <v-spacer></v-spacer>
            <v-btn color="brown lighten-1 white--text" @click="menu = false">Cancel</v-btn>
            <v-btn color="brown lighten-1" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" :return-value.sync="picker"
        transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field outlined v-model="picker" label="Select Event Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
          </template>
              <v-time-picker color="brown" v-model="picker">
              <v-btn text color="brown lighten-1 white--text" @click="menu1 = false">Cancel</v-btn>
              <v-btn text color="brown lighten-1" @click="$refs.menu1.save(picker)">OK</v-btn>
              </v-time-picker>
        </v-menu>
        <v-btn @click="extraSlots = !extraSlots" text outlined block class="mb-2">Add extra class/event times</v-btn>
        <div v-if="extraSlots">
        <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="picker2"
          transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field outlined v-model="picker2" label="Select Event Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
            </template>
                <v-time-picker color="brown" v-model="picker2">
                <v-btn text color="brown lighten-1 white--text" @click="menu2 = false">Cancel</v-btn>
                <v-btn text color="brown lighten-1" @click="$refs.menu2.save(picker2)">OK</v-btn>
                </v-time-picker>
        </v-menu>
        <v-menu ref="menu3" v-model="menu3" :close-on-content-click="false" :nudge-right="40" :return-value.sync="picker3"
        transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field outlined v-model="picker3" label="Select Event Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
          </template>
              <v-time-picker color="brown" v-model="picker3">
              <v-btn text color="brown lighten-1 white--text" @click="menu3 = false">Cancel</v-btn>
              <v-btn text color="brown lighten-1" @click="$refs.menu3.save(picker3)">OK</v-btn>
              </v-time-picker>
        </v-menu>
        <v-menu ref="menu4" v-model="menu4" :close-on-content-click="false" :nudge-right="40" :return-value.sync="picker4"
        transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field outlined v-model="picker4" label="Select Event Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
          </template>
              <v-time-picker color="brown" v-model="picker4">
              <v-btn text color="brown lighten-1 white--text" @click="menu4 = false">Cancel</v-btn>
              <v-btn text color="brown lighten-1" @click="$refs.menu4.save(picker4)">OK</v-btn>
              </v-time-picker>
        </v-menu>
        <v-menu ref="menu5" v-model="menu5" :close-on-content-click="false" :nudge-right="40" :return-value.sync="picker5"
        transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field outlined v-model="picker5" label="Select Event Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
          </template>
              <v-time-picker color="brown" v-model="picker5">
              <v-btn text color="brown lighten-1 white--text" @click="menu5 = false">Cancel</v-btn>
              <v-btn text color="brown lighten-1" @click="$refs.menu5.save(picker5)">OK</v-btn>
              </v-time-picker>
        </v-menu>
        <v-menu ref="menu7" v-model="menu7" :close-on-content-click="false" :nudge-right="40" :return-value.sync="picker6"
        transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field outlined v-model="picker6" label="Select Event Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
          </template>
              <v-time-picker color="brown" v-model="picker6">
              <v-btn text color="brown lighten-1 white--text" @click="menu6 = false">Cancel</v-btn>
              <v-btn text color="brown lighten-1" @click="$refs.menu7.save(picker6)">OK</v-btn>
              </v-time-picker>
        </v-menu>
        </div>
        <v-btn v-on:click="Modify()" block>Modify Event</v-btn>
      </div>
      </v-card>
    </v-flex>
  </v-layout>
      </v-container>
</template>
<script>
import fb from '@/fb'
export default
{
  data()
  {
    return{
      extraSlots: false,
      menu7:false,
      menu2: false,
      picker2: "",
      menu3: false,
      picker3: "",
      menu4: false,
      picker5: "",
      menu5: false,
      picker6: "",
      menu6: false,
      picker4: "",
      eventList: ["BugsandBrews", "IntroClasses", "TyingClasses",  "CreekCleanup",  "FishAlongs", "otherEvents", "otherClasses"],
      dbName: "",
      docsList: [],
      show: false,
      name: "",
      showError: false,
      showSuccess: false,
      error: "",
      id: "",
      emails: [],
      userids: [],
      date: "",
      picker: "",
      capacity: "",
      menu: false,
      menu1:false,
      description: ""
    }
  },
  methods: {
    getPost(){
      let id = this.name.split("//");
      fb.db.collection(this.dbName).doc(id[3]).get().then((snapshot)=>
      {
          this.description = snapshot.data().description;
          this.capacity = snapshot.data().capacity;
          this.date = snapshot.data().date;

          for(var i = 0; i < snapshot.data().time.length; i++)
          {
            if(i == 0){
              this.picker = snapshot.data().time[0];
            }
            if(i == 1){
              this.extraSlots = true;
              this.picker2 = snapshot.data().time[1];
            }
            if(i == 2){
              this.picker3 = snapshot.data().time[2];
            }
            if(i == 3){
              this.picker4 = snapshot.data().time[3];
            }
            if(i == 4){
              this.picker5 = snapshot.data().time[4];
            }
            if(i == 5){
              this.picker6 = snapshot.data().time[5];
            }
          }



      })
    },
    refresh(){
      window.location.reload();
    },
    getDocs(){
      this.docsList = []
      fb.db.collection(this.dbName).get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.docsList.push(
            doc.data().title + "//" + doc.data().date + "//" +  doc.data().time[0] + "//" + doc.id
          )
          this.show = true;
        })
      })
    },
    createDateSlots(){
      var slots = [];
      slots.push(this.picker);
      if(this.picker2 != ""){
        slots.push(this.picker2);
      }
      if(this.picker3 != ""){
        slots.push(this.picker3);
      }
      if(this.picker4 != ""){
        slots.push(this.picker4);
      }
      if(this.picker5 != ""){
        slots.push(this.picker5);
      }
      if(this.picker6 != ""){
        slots.push(this.picker6);
      }
      return slots;
    },
    Modify(){
      let id = this.name.split("//");
      let timeArray = this.createDateSlots();
      this.id = id[3];
      fb.db.collection(this.dbName).doc(this.id).get().then(() => {
        if(this.date != "" && this.picker != "" && this.capacity != ""){
          fb.db.collection(this.dbName).doc(this.id).set({date: this.date, time: timeArray, capacity: this.capacity, description: this.description}, {merge: true}).then(() => {
            this.showSuccess = true;
            fb.db.collection('upcomingEvent').doc(this.id).set({date: this.date, time: timeArray, capacity: this.capacity, description: this.description}, {merge: true});
          }).catch((error) => {
            this.error = error;
            this.showError = true;
          })
        }
        if(this.date != "" && this.picker != "" && this.capacity == "")
        {
          fb.db.collection(this.dbName).doc(this.id).set({date: this.date, time: timeArray, description: this.description}, {merge: true}).then(() => {
            this.showSuccess = true;
            fb.db.collection('upcomingEvent').doc(this.id).set({date: this.date, time: timeArray, description: this.description}, {merge: true})
          }).catch((error) => {
            this.error = error;
            this.showError = true;
          })
        }
        if(this.date != "" &&  this.capacity != "" && this.picker == "")
        {
          fb.db.collection(this.dbName).doc(this.id).set({date: this.date, capacity: this.capacity, description: this.description}, {merge: true}).then(() => {
            this.showSuccess = true;
            fb.db.collection('upcomingEvent').doc(this.id).set({date: this.date, capacity: this.capacity, description: this.description}, {merge: true})
          }).catch((error) => {
            this.error = error;
            this.showError = true;
          })
        }
        if( this.picker != "" &&  this.capacity != "" && this.date == "")
        {
          fb.db.collection(this.dbName).doc(this.id).set({time: timeArray, capacity: this.capacity, description: this.description}, {merge: true}).then(() => {
            this.showSuccess = true;
            fb.db.collection('upcomingEvent').doc(this.id).set({time: timeArray, capacity: this.capacity, description: this.description}, {merge: true})
          }).catch((error) => {
            this.error = error;
            this.showError = true;
          })
        }
        if( this.date != "" && this.picker == "" && this.capacity == "")
        {
          fb.db.collection(this.dbName).doc(this.id).set({date: this.date, description: this.description}, {merge: true}).then(() => {
            this.showSuccess = true;
            fb.db.collection('upcomingEvent').doc(this.id).set({date: this.date, description: this.description}, {merge: true})
          }).catch((error) => {
            this.error = error;
            this.showError = true;
          })
        }
        if( this.picker != "" && this.date == "" && this.capacity == "")
        {
          fb.db.collection(this.dbName).doc(this.id).set({time: timeArray, description: this.description}, {merge: true}).then(() => {
            this.showSuccess = true;
            fb.db.collection('upcomingEvent').doc(this.id).set({time: timeArray, description: this.description}, {merge: true})
          }).catch((error) => {
            this.error = error;
            this.showError = true;
          })
        }
        if(this.capacity != "" && this.date == "" && this.picker == "")
        {
          fb.db.collection(this.dbName).doc(this.id).set({capacity: this.capacity, description: this.description}, {merge: true}).then(() => {
            this.showSuccess = true;
            fb.db.collection('upcomingEvent').doc(this.id).set({capacity: this.capacity, description: this.description}, {merge: true})
          }).catch((error) => {
            this.error = error;
            this.showError = true;
          })
        }
      });
      }
    }
}

</script>
