<template>
    <v-container>
      <v-layout row justify-center>
        <v-flex xs10 sm10 md10>
          <v-alert type="success" v-if="showSuccess"> You successfully added a {{trip}} Date!<v-btn text v-on:click="refresh()"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
          <v-alert type="warning" v-if="showError"> {{error}}</v-alert>
          <v-card>
            <h3 style="text-align:center;" class="pa-3">Add Specialty Trip Dates</h3>
            <v-select class="pa-3" outlined :items="eventList" label="Select a Trip" v-model="trip"></v-select>
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="date"
            transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field outlined v-model="date" label="Select Date" prepend-icon="event" readonly v-on="on" class="pa-3"></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title type="date"> <!--can add scrollable-->
                <v-spacer></v-spacer>
                <v-btn color="brown lighten-1 white--text" @click="menu = false">Cancel</v-btn>
                <v-btn color="brown lighten-1" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <v-btn v-on:click="Add()" block dark>Add Date</v-btn>
          </v-card>
        </v-flex>

        <v-flex xs10 sm10 md10>
          <v-alert type="success" v-if="showDelete"> You successfully Deleted a {{trip}} Date!<v-btn text v-on:click="refresh()"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
          <v-alert type="warning" v-if="showError1"> {{error1}}</v-alert>
          <v-card class="mt-6">
          <h3 style="text-align:center;" class="pa-3">Delete Specialty Trip Dates</h3>
          <v-select class="pa-3" outlined :items="eventList" label="Select a Trip" v-model="tripDel" @input="getDates()"></v-select>
          <v-select v-if="showDates" class="pa-3" outlined :items="dateList" label="Select a Date to Delete" v-model="date" ></v-select>
          <v-btn v-if="showDates" v-on:click="Delete()" block dark>Delete Date</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>
<script>
import fb from '@/fb'
export default{
  data()
  {
    return{
      eventList: ["Boxwood","Long Meadow", "Phantom"],
      trip: "",
      menu: false,
      date: "",
      showError: false,
      showSuccess: false,
      error: "",
      dateList: [],
      tripDel: "",
      showDates: false,
      showDelete: false,
      showError1: false,
      error1: "",
      deleteID: ""

    }
  },
  methods:{
    Delete(){
      fb.db.collection('SpecialtyTrips').where("date", "==", this.date).where("type", "==", this.tripDel).get().then((snapshot)=> {
        snapshot.docs.forEach((doc) => {
          this.deleteID = doc.id;
        })

      }).then(() => {
        fb.db.collection('SpecialtyTrips').doc(this.deleteID).delete().then(() => {
          this.showDelete = true;
          }).catch((error) => {
            this.error = error;
            this.showError = true;

      })
    })
    },
    getDates(){
      this.dateList = []
      fb.db.collection('SpecialtyTrips').where("type", "==", this.tripDel).get().then((snapshot)=> {

        snapshot.docs.forEach((doc) =>{
          this.dateList.push(doc.data().date)
        })
        this.showDates = true;
      })
    },
    refresh(){
      window.location.reload();
    },
    Add(){
      if(this.trip == "Long Meadow")
      {
        fb.db.collection('SpecialtyTrips').add({trip: "Boxwood", date: this.date, type: this.trip}).then(() => {
          this.showSuccess = true;
        }).catch((error) =>{
          this.error = error;
          this.showError = true;
        })
      }
      if(this.trip == "Boxwood")
      {
        fb.db.collection('SpecialtyTrips').add({trip: "Boxwood", date: this.date, type: this.trip}).then(() => {
          this.showSuccess = true;
        }).catch((error) =>{
          this.error = error;
          this.showError = true;
        })
      }
      if(this.trip == "Phantom")
      {
        fb.db.collection('SpecialtyTrips').add({trip: this.trip, date: this.date, type: "Phantom"}).then(() => {
          this.showSuccess = true;
        }).catch((error) =>{
          this.error = error;
          this.showError = true;
        })
      }

    }
  }
}
</script>
