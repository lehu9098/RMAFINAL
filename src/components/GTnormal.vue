<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm12 md12>
      <div>
        <v-container>
          <v-layout row wrap justify-center>
            <v-flex sm11 xs11 md12>
              <v-btn text route to="/GuideTrips"><v-icon>navigate_before</v-icon>Guided Trips</v-btn>
            </v-flex>
            <v-flex sm11 xs11 md12 style="border-top: 1px solid black;">
              <carosel :images="photos"></carosel>
            </v-flex>

            <v-flex sm11 xs11 md12>
              <div class="pa-4 " style="border-bottom: 1px solid black; border-top: 1px solid black;">
                <h1 style="text-align:center;" class="text-uppercase">{{title}}</h1>
              </div>
            </v-flex>
            <v-flex xs11 sm9 md9>
              <div class="pa-4 ">
                <p>{{about}}</p>
                <v-btn text block tile style="border-top: 1px solid black; border-bottom: 1px solid black; font-size: 150%;"><a href="https://fareharbor.com/embeds/book/rockymtanglers/?full-items=yes" style="color: black"> Book Now! </a></v-btn>
              </div>
            </v-flex>
            <v-flex xs11 sm3 md3>
              <div class="pa-4 ">
                <h4>{{title}} Price</h4>
                <ul v-for="c in cost" :key="c">
                  <li>
                    {{c}}
                  </li>
                </ul>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import carosel from '../components/carosel.vue'
export default
{
  components:{
    carosel
  },
  props:{
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
    },
    cost:
    {
      type: Array,
      required: true
    }
  },
  data(){
    return{

    }
  }
}
</script>
<style scoped>
a{
  text-decoration: none;
  color: black;
}
</style>
