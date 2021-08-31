<template>
  <div>
    <v-card tile flat class="ma-2 border-thing">
        <h2 style="border-bottom: 1px solid black; text-align:center;" class="pa-4 font-weight-light"><strong>Upcomming Events</strong></h2>
        <h5 v-if="showNone" style="text-align:center;">There are no upcomming events at this time</h5>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <v-card flat tile class="mx-6">
          <v-layout row wrap justify-center>
            <v-flex xs12 sm4 md4>
              <v-card flat tile class="centered" height="100%">
                  <v-img :src="upEventOne.image" width="100%" height="100%">
                      <v-overlay value="true" absolute>
                        <h2 class="pa-1" style="text-align: center;">{{upEventOne.title}}</h2>
                        <h3 style="color: white; text-align: center;" class="pa-1">{{upEventOne.date}}</h3>
                        <h4 class="pa-1" style="text-align: center;">{{upEventOne.time}}</h4>
                        <v-btn class="grey" block text v-if="upEventOne.show" route :to="upEventOne.catagory" outlined rounded>Check Out Event</v-btn>
                      </v-overlay>
                  </v-img>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-card flat tile class="centered" height="100%">
                  <v-img :src="upEventTwo.image" width="100%" height="100%">
                      <v-overlay value="true" absolute>
                        <h2 class="pa-1" style="text-align: center;">{{upEventTwo.title}}</h2>
                        <h3 style="color: white; text-align: center;" class="pa-1">{{upEventTwo.date}}</h3>
                        <h4 class="pa-1" style="text-align: center;">{{upEventTwo.time}}</h4>
                        <v-btn block text class="grey" v-if="upEventTwo.show" route :to="upEventTwo.catagory" outlined rounded>Check Out Event</v-btn>
                      </v-overlay>
                  </v-img>
              </v-card>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-card flat tile class="centered" height="100%">
                <v-img :src="upEventThree.image" width="100%" height="100%">
                    <v-overlay value="true" absolute>
                      <h2 class="pa-1" style="text-align: center;" v-if="upEventThree.show">{{upEventThree.title}}</h2>
                      <h3 style="color: white; text-align: center;" class="pa-1">{{upEventThree.date}}</h3>
                      <h4 class="pa-1" style="text-align: center;">{{upEventThree.time}}</h4>
                      <v-btn block text class="grey" v-if="upEventThree.show" route :to="upEventThree.catagory" outlined rounded>Check Out Event</v-btn>
                    </v-overlay>
                </v-img>
            </v-card>
        </v-flex>
          </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>

  </div>
</template>

<script>
import fb from '@/fb'
export default {
  data(){
    return{
      upEventOne: {},
      upEventTwo: {},
      upEventThree: {},
      showNone: false
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
        if(timeCheck >= 10)
        {
          timeFormatted = time.slice(0, 5) + " AM";
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
  created()
  {
    this.deletePastEvent('upcomingEvent');
    fb.db.collection('upcomingEvent').orderBy('date').get().then((snapshot) =>
    {

        if(snapshot.docs.length == 0)
        {

          this.showNone = true;

        }
        if(snapshot.docs.length === 1)
        {
          this.upEventOne = snapshot.docs[0].data();
          this.upEventOne.show = true;
          this.upEventOne.date = this.dateFormatted(snapshot.docs[0].data().date);
          this.upEventOne.time = this.timeFormatted(snapshot.docs[0].data().time);
          this.upEventTwo.title = "There are no upcomming events at this time.";
          this.upEventTwo.show = false;
          this.upEventThree.title = "There are no upcomming events at this time.";
          this.upEventThree.show = false;
        }
        if(snapshot.docs.length === 2){
          this.upEventOne = snapshot.docs[0].data();
          this.upEventTwo = snapshot.docs[1].data();
          this.upEventOne.show = true;
          this.upEventTwo.show = true;
          this.upEventOne.date = this.dateFormatted(snapshot.docs[0].data().date);
          this.upEventOne.time = this.timeFormatted(snapshot.docs[0].data().time);
          this.upEventTwo.date = this.dateFormatted(snapshot.docs[1].data().date);
          this.upEventTwo.time = this.timeFormatted(snapshot.docs[1].data().time);
          this.upEventThree.title = "There are no upcomming events at this time.";
          this.upEventThree.show = false;
        }
        if(snapshot.docs.length >= 3){
          this.upEventOne = snapshot.docs[0].data();
          this.upEventTwo = snapshot.docs[1].data();
          this.upEventThree = snapshot.docs[2].data();
          this.upEventOne.show = true;
          this.upEventTwo.show = true;
          this.upEventThree.show = true;
          this.upEventOne.date = this.dateFormatted(snapshot.docs[0].data().date);
          this.upEventOne.time = this.timeFormatted(snapshot.docs[0].data().time);
          this.upEventTwo.date = this.dateFormatted(snapshot.docs[1].data().date);
          this.upEventTwo.time = this.timeFormatted(snapshot.docs[1].data().time);
          this.upEventThree.date = this.dateFormatted(snapshot.docs[2].data().date);
          this.upEventThree.time = this.timeFormatted(snapshot.docs[2].data().time);
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
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.border-top
{
  border-top: 1px solid black;
}
.marg{
  margin-top: 50%;
}
</style>
