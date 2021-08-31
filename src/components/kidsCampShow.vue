<template>
  <div class="classes">
    <v-layout row wrap inline-block justify-center class="py-1 my-1" >
        <v-flex xs12 sm8 md12>
          <h3 style="background-color: white; padding: 10px; text-align:center" v-show="!show">There Are No Events Scheduled Right now</h3>
        </v-flex>
      </v-layout>
    <v-container class="py-1 my-1" v-show="show">
          <v-layout row wrap inline-block justify-center>
            <v-flex xs12 sm12 md12>
              <v-card flat tile class="pa-4 Align text-uppercase" style="border-top: 1px solid black; border-bottom: 1px solid black;">
                <h2>Upcoming {{title}}</h2>
              </v-card>
            </v-flex>
              <v-flex xs12 sm8 md6 id="about" v-for="evt in eventInfo" :key="evt.id" >
                <v-card  flat tile class="ma-2 border-thing card-overflow" max-height="800" scrollable>
                  <v-img class="white--black align-end" height="400" :src="evt.image">
                      <v-overlay value="true" absolute>
                        <h2 class="text-center pt-2">{{evt.title}}</h2>
                      </v-overlay>
                  </v-img>
                  <v-card-text> <b>Description:</b> {{evt.description}} </v-card-text>
                  <v-card-text><b> Date: </b>{{evt.date}} - {{evt.endDate}}</v-card-text>
                  <v-card-text> <b>Time: </b>{{evt.time}} - {{evt.endTime}}</v-card-text>
                  <v-btn text route :to="'/KidsCamp/' + evt.id + '/' + evt.date + '/' + evt.time" block class=" button-img grey">Inquire About {{evt.title}}</v-btn>
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
    type:
    {
      type: String,
      required: true
    },
    title:
    {
      type: String,
      required: true
    }
  },
    data(){
      return{
        eventInfo: [],
        emails: [],
        currentID: "",
        admin: true,
        phoneN: '',
        Email: '',
        Name: '',
        show: true
        }
    },
    methods:{
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
    created(){
      this.deletePastEvent('kidsCamp');
      fb.db.collection(this.dbName).orderBy("date").where("type", "==", this.type).get().then((snapshot) => {
        //gets the docs array
        if(snapshot.docs.length == 0)
        {

          this.showNone = true;

        }
        else{

          snapshot.docs.forEach((doc) => {
            this.eventInfo.push({
              ...doc.data(),
              show: true,
              date: this.dateFormatted(doc.data().date),
              endDate: this.dateFormatted(doc.data().enddate),
              time: this.timeFormatted(doc.data().time),
              endTime: this.timeFormatted(doc.data().endTime),
              id: doc.id
            })
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
