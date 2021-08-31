<template>
  <div class="my-4">
    <v-row no-gutters>
      <v-col md='12'>
        <h2 style="border-bottom: 1px solid black; border-top: 1px solid black; text-align:center;" class="pa-4 font-weight-light"><strong>Upcoming Events</strong></h2>
      </v-col>
    </v-row>
  <v-row no-gutters class="flex-nowrap" style="overflow: hidden">
    <v-col  xs='1' sm='1' md='1' >
      <div class="centerV" v-on:click="toggleLeft()">
        <v-btn text><v-icon x-large>keyboard_arrow_left</v-icon></v-btn>
      </div>
    </v-col>
    <v-row no-gutters class="flex-nowrap" style="overflow: hidden">
      <v-col xs='4' sm='4' md='4' v-for="(evt, index) in upEvents" :key="index">
        <v-card flat tile class="centered" height="100%">
            <v-img :src="evt.image" width="100%" height="100%">
                <v-overlay value="true" absolute>
                  <h2 class="pa-1" style="text-align: center;">{{evt.title}}</h2>
                  <h3 style="color: white; text-align: center;" class="pa-1">{{evt.date}}</h3>
                  <h4 class="pa-1" style="text-align: center;">{{evt.time}}</h4>
                  <v-btn class="grey" block text v-if="evt.show" route :to="evt.catagory" outlined rounded>Check Out Event</v-btn>
                </v-overlay>
            </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-col md='1'>
      <div class="centerV"  v-on:click="toggleRight()">
        <v-btn text><v-icon x-large>keyboard_arrow_right</v-icon></v-btn>
      </div>
    </v-col>
  </v-row>
</div>

</template>
<script>
import fb from '@/fb'
export default
{
  /*props:{
    images:
    {
      type: Array
    }
  }*/
  data(){
    return{
      upEvents: [],

    }
  },
  methods:
  {
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
    },
    dateFormatted: function(date)
    {
      const month = ["January", "February", "March", "April", "May",  "June", "July", "August", "September", "October", "November", "December"];
      const week = [ "Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"]
      var nd = new Date(date.replace(/-/g, '/')); //Replace changes - with / so we can get the proper date
      //console.log(nd, date)
      var dateFormatted = week[nd.getDay()] + ", " + month[nd.getMonth()] + " " + nd.getDate();
      return dateFormatted;
    },
    toggleLeft: function()
    {
        var lastElementIndex = this.upEvents.length - 1;
        var pushImage = this.upEvents[lastElementIndex];
        this.upEvents.pop();
        this.upEvents.unshift(pushImage);
    },
    toggleRight: function()
    {

        var pushImage = this.upEvents[0];
        this.upEvents.shift();
        this.upEvents.push(pushImage);
    },
    deletePastEvent: function(dbName)
    {
      fb.db.collection(dbName).get().then((snapshot) =>
      {
          const today = new Date();
          const date = today.getFullYear()+'-'+ '0' +(today.getMonth()+1)+'-'+ '0' +today.getDate();
          snapshot.docs.forEach(doc =>
          {
            if(Date.parse(doc.data().date) < Date.parse(date) )
            {
              fb.db.collection(dbName).doc(doc.id).delete().then(()=>
              {
                  console.log("Deleted from DB");

              })
            }

          })

      })
    }
  },
  created(){
    this.deletePastEvent('upcomingEvent');
    fb.db.collection('upcomingEvent').orderBy('date').get().then((snapshot) =>
    {

        if(snapshot.docs.length == 0)
        {
          this.showNone = true;
        }
        else{
          snapshot.docs.forEach((doc) => {
            this.upEvents.push({
              ...doc.data(),
              show: true,
              date: this.dateFormatted(doc.data().date),
              time: this.timeFormatted(doc.data().time[0])
            })
          })

        }
  });

}
}


</script>
<style scoped>
.centerV
{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 5%;
}
.space{
  display: flex;
  justify-content: flex-end;
}
.title{
  text-align: center;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
}
</style>
