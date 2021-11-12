<template>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12 md12>
        <div>
          <v-container>
            <v-layout row wrap justify-center>
              <v-flex sm11 xs11 md12>
                <v-btn text route to="/classes"><v-icon>navigate_before</v-icon>Classes</v-btn>
              </v-flex>
              <v-flex sm11 xs11 md12>
                <v-img src="../../Photos/oneonone.jpg"></v-img>
              </v-flex>
              <v-flex sm11 xs11 md12>
                <div class="pa-4 " style="border-bottom: 1px solid black; border-top: 1px solid black;">
                  <h1 style="text-align:center;" class="text-uppercase">{{eventName}}</h1>
                </div>
              </v-flex>
              <v-flex xs11 sm9 md9>
                <div class="pa-4 ">
                  <p>{{about}}</p>
                </div>
              </v-flex>
              <v-flex xs11 sm3 md3>
                <div class="pa-4 ">
                  <h4 style="text-align: center; border-bottom: 1px solid black;" class="pa-1">{{title}} Price</h4>
                  <ul v-for="c in prices" :key="c">
                    <li class="pa-1">
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
//import fb from '@/fb'
export default
{
    data(){
      return{
          eventName: "One-On-One Classes",
          about: "Sometimes an angler will have a bit of trouble with one aspect of the game in particular, say mending, or a particular cast. For these customized situations we offer a variety of ONE to ONE classes and instruction opportunities.  This platform of One-On-One classes is designed to help anglers problem solve, or tackle a particular issue.  We offer: casting, fly tying, nymphing, knots, euro nymphing, roll casting, spey casting, tenkara fishing, and many more.  These classes take place in the classroom or outside the shop at a park or field suitable for casting. If you are interested in a One-On-One class call the shop to pick a date and time and the first session is free.  After that the classes are billed at a rate of $40/ hour.  Many anglers realize the help they need within the first session, but often come back for a tune ups or to help knock off some rust.",
          prices: ["$40 per hour"]
        }
    }
  }
</script>
