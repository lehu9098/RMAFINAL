<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm12 md12>
      <div>
        <v-container>
          <v-layout row wrap justify-center>
            <v-flex sm11 xs11 md12>
              <v-btn text route to="/GuideTrips"><v-icon>navigate_before</v-icon>Guided Trips</v-btn>
            </v-flex>
            <v-flex sm11 xs11 md12>
              <div class="pa-4 " style="border-bottom: 1px solid black; border-top: 1px solid black;">
                <h1 style="text-align:center;" class="text-uppercase">{{title}}</h1>
              </div>
            </v-flex>
            <v-flex sm11 xs11 md12>
              <div class="pa-4 " style="border-bottom: 1px solid black;">
                <p>{{about}}</p>
              </div>
            </v-flex>
            <v-flex sm11 xs11 md12>
              <carosel :images="photos"></carosel>
            </v-flex>
            <v-flex sm11 xs11 md12 v-if="show">
              <div class="pa-4 " style="border-bottom: 1px solid black; border-top: 1px solid black; text-align:center;">
                <h2 class="text-uppercase">Upcoming Dates</h2>
              </div>
            </v-flex>
            <v-flex sm11 xs11 md3 v-for="(date, i) in dates" :key="i">
              <v-card raised outlined class="pa-2">
                <h3 style="text-align: center; border-bottom: 1px solid black">{{date.type}}</h3>
                <h3 style="text-align: center;">Date: {{date.date}}</h3>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import carosel from '../components/carosel.vue'
import fb from '@/fb'
export default
{
  components:{
    carosel
  },
  props:{
    trip:{
      type: String,
      required: true
    },
    title:
    {
      type: String,
      required: true
    },
    about:
    {
      type: String,
      required: true
    },
    photos:
    {
      type: Array,
      required: true
    }
  },
  data(){
    return{
      dates: [],
      show: false
    }
  },
  created(){
    fb.db.collection('SpecialtyTrips').where("trip", "==", this.trip).orderBy('date').get().then((snapshot) => {

      snapshot.docs.forEach((doc) => {
        this.dates.push({date: doc.data().date, type: doc.data().type})
        this.show = true;
      })
      if(this.dates.length != 0)
      {
        this.show = true;
      }
    })

  }
}



</script>
