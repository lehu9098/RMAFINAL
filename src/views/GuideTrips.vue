<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm12 md12>
      <div>
        <v-container>
          <v-layout row wrap justify-center>
            <v-flex sm11 xs11 md12>
              <div class="pa-4 " style="border-bottom: 1px solid black; border-top: 1px solid black;">
                <h1 style="text-align:center;" class="text-uppercase">Guided Trips</h1>
              </div>
            </v-flex>
            <v-flex sm11 xs11 md12>
              <v-row no-gutters>
                <v-col v-for="trip in trips" :key="trip.title" class=" align-items-center pa-3" style="border-bottom: 1px solid black;">
                  <v-btn route :to="trip.src" text block>
                    <span class="text-uppercase" text>{{trip.title}}</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-flex>
            <v-flex sm11 xs11 md12>
                <phototog :images="images" aspect-ratio="1.9"></phototog>
            </v-flex>
            <v-flex  sm11 xs11 md12 class="mt-3">
              <v-row no-gutters>
                <v-col xs="12" sm="12" md="12">
                  <h2 style="text-align:center;">About Guided Trips</h2>
                  <p class="pa-3"> {{points2[0]}}</p>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col xs="12" sm="12" md="12">
                  <h2 style="text-align:center;">Visiting the University? Why not fish..</h2>
                  <p class="pa-3"> {{points[0]}}</p>
                </v-col>
              </v-row>
                <v-row no-gutters>
                  <v-col xs="12" sm="12" md="12">
                    <h2 style="text-align:center;">Group Trips/Corporate Trips </h2>
                    <p class="pa-3"> Rocky Mountain Anglers offers guided fly fishing experiences for larger groups as well.  We can outfit groups of up to 30 anglers for as little as $125 per angler all inclusive.  Just call or email the shop and we can put together a quote for your larger party.  Whether it's a half day trip, full day, or just a couple hours on the water, we have the staff and the gear to make your time on the water memorable.</p>
                  </v-col>
                </v-row>
              <v-row no-gutters>
                <v-col xs="12" sm="12" md="12">
                  <v-btn text class="justify-center border-thing mt-1 pa-8 font-weight-light" tile block style="font-size: 150%;"><a href="https://fareharbor.com/embeds/book/rockymtanglers/?full-items=yes"><h1 style="color: black;">Book Now!</h1></a></v-btn>
                </v-col>
              </v-row>
            </v-flex>

          </v-layout>
          </v-container>
          <!--<v-container>
              <v-layout row wrap inline-block justify-center>
                <v-flex xs12 sm12 md12>
                  <h1 class="text-center pa-2"  style="border-bottom: 1px solid black; border-top: 1px solid black;">Trip Destinations</h1>
                </v-flex>
                <v-flex xs12 sm8 md4 v-for="river in riverInfo" :key="river.id">
                  <RiverDescription :RiverInfo="river"></RiverDescription>
                </v-flex>
            </v-layout>
          </v-container>-->
</div>
</v-flex>
</v-layout>
</template>
<script>
//import RiverDescription from "../components/RiverDescription.vue"
import phototog from '@/components/carosel'
//import rightBlock from '@/components/rightPhotoBlock.vue'
//import leftBlock from '@/components/leftPhotoBlock.vue'
export default
{
  components:
  {
    //RiverDescription,
    phototog,
    //rightBlock,
    //leftBlock
  },
  data: () => ({

    info: {},

    riverInfo: [{id: 1, name: "Boulder Creek", url:'https://a-lodge.com/wp-content/uploads/asp9tvkl2esu10e1kopu.jpg' , drive: "15-30 minutes" ,show: false, bio: "Boulder Creek is a medium sized freestone creek"},
    {id: 2, name: "South Boulder Creek", url: 'https://cdn-files.apstatic.com/hike/7039625_medium_1555092312.jpg' , drive: "25-45 minutes" ,show: false, bio: "South Boulder Creek is a medium sized freestone creek"}],

    images: [require("../Photos/Guidetrips/cutty.jpg"), require("../Photos/Guidetrips/clientbigt.jpg"), require("../Photos/fish photos/IMG_0120.jpg"), require("../Photos/Guidetrips/guidepair.jpg"), require("../Photos/Guidetrips/IMG_2059.jpg"), require("../Photos/Guidetrips/IMG_3810.jpg"), require("../Photos/fish photos/272I5525.jpeg")],

    points: ["Rocky Mountain Anglers is conveniently located just a stone's throw away from the University campus in the heart of Boulder, Colorado. Surrounded by the majestic Rocky Mountains, the city of Boulder offers easy access to year-round outdoor activities including some of the nation's best fly fishing."],

    points2: ["Rocky Mountain Anglers is conveniently located within minutes of some of the Front Range’s best small stream fly fishing for wild trout. The varied waters of Rocky Mountain National Park are just a little further up the road, and this is a great destination for a Full Day April - September. We also offer trips on Boulder Creek, sections of the St. Vrain creeks, and the Blue River outside Silverthorne. All trip prices include waders, rods, reels, and flies, and full day trips include lunches provided by local deli Dish Gourmet. Make your visit to the Rockies a memorable one by getting out on the water with one of our expert guides who will tailor the day’s experience to meet the needs and goals of any client. Call the shop, go online, or stop by to book your guided trip today!"],

    trips: [{title: "Half Day Guided Tour", src: "/HalfDay"},{title: "Full Day Guided Tour", src: "/FullDay"},{title: "Boxwood Gulch", src: "/Boxwood"}, {title: "Phantom Canyon", src: "/Phantom"}, {title: "What To Bring", src: "/WhatToBring"}]


    })
}
</script>
<style scoped>
.border-thing
{
  border-top: .5px solid grey;
  border-bottom: .5px solid grey;

}
.border-side
{
  border-right: .5px solid grey;
}
.sty{
  color: white;
}
a{
  text-decoration: none;
  color: black;
}
</style>
