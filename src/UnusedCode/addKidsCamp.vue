<template>
  <v-container>
    <v-card raised>
    <v-alert type="success" v-if="success"> You successfully added an event </v-alert>
    <v-alert type="error" v-if="failed"> Something Went Wrong </v-alert>
      <v-layout row justify-center>
        <v-flex sm12 md8 >
        <v-form ref="form" class="pa-12">
          <h2 class="text-center">Add Kids Camp</h2>
          <label> Add Camp Title: </label>
          <v-text-field outlined v-model="title"> </v-text-field>
          <label> Add Camp Description: </label>
          <v-textarea outlined v-model="description"></v-textarea>
          <label> Add {{type}} Capacity: </label>
          <v-text-field outlined v-model="capacity"></v-text-field>
          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="dateStart"
          transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field outlined v-model="dateStart" label="Select Start Date" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="dateStart" no-title type="date"> <!--can add scrollable-->
              <v-spacer></v-spacer>
              <v-btn color="brown lighten-1 white--text" @click="menu = false">Cancel</v-btn>
              <v-btn color="brown lighten-1" @click="$refs.menu.save(dateStart)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="dateEnd"
          transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field outlined v-model="dateEnd" label="Select End Date" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="dateEnd" no-title type="date"> <!--can add scrollable-->
              <v-spacer></v-spacer>
              <v-btn color="brown lighten-1 white--text" @click="menu2 = false">Cancel</v-btn>
              <v-btn color="brown lighten-1" @click="$refs.menu2.save(dateEnd)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu ref="menu3" v-model="menu3" :close-on-content-click="false" :nudge-right="40" :return-value.sync="pickerStart"
          transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field outlined v-model="pickerStart" label="Select Event Start Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
            </template>
                <v-time-picker color="brown" v-model="pickerStart">
                <v-btn text color="brown lighten-1 white--text" @click="menu3 = false">Cancel</v-btn>
                <v-btn text color="brown lighten-1" @click="$refs.menu3.save(pickerStart)">OK</v-btn>
                </v-time-picker>
          </v-menu>
          <v-menu ref="menu4" v-model="menu4" :close-on-content-click="false" :nudge-right="40" :return-value.sync="pickerEnd"
          transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field outlined v-model="pickerEnd" label="Select Event End Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
            </template>
                <v-time-picker color="brown" v-model="pickerEnd">
                <v-btn text color="brown lighten-1 white--text" @click="menu4 = false">Cancel</v-btn>
                <v-btn text color="brown lighten-1" @click="$refs.menu4.save(pickerEnd)">OK</v-btn>
                </v-time-picker>
          </v-menu>
          <v-file-input type="file" v-model="file" accept="image/*" lable="upload Image" prepend-icon="mdi-camera"></v-file-input>
          <v-btn text block class="white" v-on:click="postEvent()"> Add Kids Camp</v-btn>
    </v-form>

        </v-flex>
      </v-layout>
</v-card>
    </v-container>
</template>
<script>
import fb from '@/fb'

export default {
  data(){
    return{
      menu: false,
      menu2:false,
      menu3:false,
      menu4:false,
      dateStart: "",
      dateEnd: "",
      pickerStart: "",
      pickerEnd: "",
      title: "",
      description: "",
      selectedFile: null,
      success: false,
      failed: false,
      file: null,
      picture: null,
      about: {},
      location: "",
      currentDB: "",
      capacity: ""




    }
  },
  methods:{
    formatDate: function(d)
    {
      const month = ["January", "February", "March", "April", "May",  "June", "July", "August", "September", "October", "November", "December"];
      const week = ["Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday", "Sunday"];
      const date = new Date(Date.parse(d));
      const dateFormatted = week[date.getDay()] + ", " + month[date.getMonth()] + " " + date.getDate();
      return dateFormatted
    },
    postEvent: function()
    {
      const date1 = this.formatDate(this.dateStart);
      const date2 = this.formatDate(this.dateEnd);
      const dateFormatted = date1 + " - " + date2;
      const timeCheck = this.pickerEnd.slice(0, 2)
      const startTime = this.pickerStart.slice(1, 5) + " AM"; //Because we know it will begin before 12 and end After 12
      const endTime = (timeCheck-12) + this.pickerEnd.slice(2, 5) + " PM";
      const time = startTime + " - " + endTime;
      console.log(dateFormatted, time)
      fb.storage.ref(this.file.name).put(this.file).then((snapshot)=>
    {
        snapshot.ref.getDownloadURL().then((url)=>{
          this.picture = url;
          this.about = {
              title: this.title,
              description: this.description,
              date: dateFormatted,
              startDate: this.dateStart,
              time: time,
              image: this.picture,
              capacity: Number(this.capacity),
              reminderSend: false
              }
              console.log(this.about);
              fb.db.collection("kidsCamp").add(this.about).then(()=>{
                  this.success = true;
                })

        })
      })

      //this.$refs.form.reset()
        //this.$refs.form.resetValidation()
      },


  }}

</script>
