<template>
  <v-app id="inspire">
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on"> Click Me </v-btn>
      </template>
      <v-card class="pa-4">
        <v-alert type="success" v-if="alert"> You Successfully booked a Appoointment You'll recieve a confirmation Email Shortly</v-alert>
        <v-card-title class="headline grey lighten-2" primary-title> Covid Booking </v-card-title>
        <v-form>
          <v-text-field v-model="name" type="text" label="Enter Full Name"></v-text-field>
          <v-text-field v-model="appointmentNotes" type="text" label="Enter Appointment Details"></v-text-field>
          <v-text-field v-model="startDate" type="date" label="start Date (required)" v-on:input="getAvailableTimes()"></v-text-field>
          <v-select :items="times" v-model="slot" label="Select An Avalaible Time Slot" v-on:input="checkAvailability()"></v-select>
          <v-select :items="durration" v-model="length" label="Select Appointment Length in Minutes"></v-select>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn  color="primary" text @click="book()">Book Your Appointment Now</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</v-app>
</template>
<script>
import fb from '@/fb'
export default{
  data(){
    return{
      dialog: true,
      alert: false,
      slot: "",
      startDate: "",
      length: "",
      appointmentNotes: "",
      name: "",
      durration: ["15", "30", "45", "60"],
      times: ["08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM", "09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM", "10:00 AM", "10:30 AM", "11:00 PM"],
      slotsTaken: [],
      updatedDurration: []

    }
  },
  methods:
  {
    book: function()
    {
      let timeSlot = this.formatTime();
      let end = this.endTime(timeSlot, this.length);
      fb.db.collection("Covid").add({date: this.startDate, durration: this.length, name: this.name, startTimeFormatted: this.startDate + "T" + timeSlot,endTimeFormatted: this.startDate + "T" + end, startTime: timeSlot, endTime: end, details: this.appointmentNotes}).then( () => {
        this.alert = true;
      })


    },
    checkAvailability: function()
    {
      let startTime = this.formatTime();
      //let endTime = this.endTime(startTime, this.length);
    /*  let start = this.formatTimeBack(startTime);
      let end = this.formatTimeBack(endTime);*/
      let longestDurration;
      let startHour = parseInt(startTime.slice(0, 2));
      let startMinute = parseInt(startTime.slice(3, 5));
      let x = 0;
      for(x; x < this.slotsTaken.length; x++)
      {
        let hours = parseInt(this.slotsTaken[x].slice(0,2));
        let minutes = parseInt(this.slotsTaken[x].slice(3, 5));
        console.log(hours, minutes, startHour, startMinute)
        if(hours == startHour)
        {
            if(minutes > startMinute)
            {
              longestDurration = minutes - startMinute;
            }
            //if(minutes > startMinute) is covered by not being able to selct it
            else if(minutes < startMinute)
            {
              alert("not possible")
            }
            break;
        }
        if(hours > startHour)
        {
          if(minutes > startMinute)
          {
            longestDurration = (minutes - startMinute) + 60
          }
          else if(minutes == startMinute)
          {
            longestDurration = 60;
          }
          else if(minutes < startMinute)
          {
            longestDurration = (60 - startMinute) + minutes
          }
          break;
        }
      }
      x = 0;
      console.log(longestDurration.toString())
      for(x; x < this.durration.length; x++)
      {
        while(this.durration[x] != longestDurration.toString())
        {
          this.updatedDurration.push(this.durration[x])
        }
      }

    },
    getAvailableTimes: function()
    {
      fb.db.collection("Covid").where("date", "==", this.startDate).get().then((snapshot) => {
        let dateData = snapshot.docs;
        dateData.forEach(doc => {
          console.log(doc.data().startTime, doc.data().endTime)
          let start = this.formatTimeBack(doc.data().startTime);
          let end = this.formatTimeBack(doc.data().endTime);
          let x = 0;
          let i;
          for(x; x < this.times.length; x++)
          {
            if(this.times[x] === start){
              console.log("found Start")
              i = x;
              console.log(i)
              while(this.times[i] != end)
              {
                this.slotsTaken.push(this.times[i])
                this.times.push(this.times.splice(x, 1)[0]);
                console.log(this.times)
                this.times.pop()

              }
            }
          }
        })

      })
    },
    endTime : function(time, durration){
      let minutes = parseInt(time.slice(3,5));
      let hours = time.slice(0,2);
      let span = parseInt(durration);
      let endTime;
      if(span + minutes > 59)
      {
        let tempMin = (span + minutes) % 60;
        hours = (parseInt(hours) + 1).toString();
        console.log(hours)
        if(hours > 9){
          if(tempMin == 0)
          {
           endTime = hours + ":" + tempMin.toString() +"0";
         }
         else {
           endTime = hours + ":" + tempMin.toString()
         }
        }
        else {
          if(tempMin == 0)
          {
            endTime = "0" + hours + ":"+ tempMin.toString() + "0";
          }
          else{
            endTime = "0" + hours + ":"+ tempMin.toString();
          }
        }
      }
      else
      {
        endTime = hours + ":"+ (span + minutes).toString();
      }
      return endTime;
    },
    formatTime: function()
    {
      let Abrev = this.slot.slice(6,8);
      let timeSlot;
      let minutes;
      if(Abrev === "AM")
      {
        timeSlot = this.slot.slice(0,5);
      }
      else
      {
        timeSlot = this.slot.slice(0,2);
        minutes = this.slot.slice(2,5);
        timeSlot = parseInt(timeSlot) + 12;
        timeSlot = timeSlot.toString() + minutes;
      }
      return timeSlot;
    },
    formatTimeBack: function(time)
    {
      let hours = time.slice(0,2)
      let minute = time.slice(3,5)
      let timeSlot
      if(hours > 12)
      {
        hours = parseInt(hours) - 12;
        timeSlot = hours.toString() + minute + " PM"
      }
      else {
        timeSlot = time + " AM"
      }
      return timeSlot;
    }
  },
  created()
  {
    //could have start time and end time. Only 4 people can be booked at once. We have to see only 4 people can book at a starttime.
    fb.db.collection("Covid").get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        let timeSlot = this.formatTimeBack(doc.data().time.slice(11,16));
        let x = 0;
        for(x; x < this.times.length; x++)
        {
          if(timeSlot === this.times[x])
          {
            this.times.push(this.times.splice(x, 1)[0]);
            console.log(this.times)
            this.times.pop()
            break;
          }
        }
      })
    })


  }
}
</script>
