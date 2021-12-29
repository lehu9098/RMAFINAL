<template>
  <div>
      <v-layout justify-center>
        <v-flex xs12 sm12 md12 lg12>
          <v-container>
            <v-row no-gutters>
                <v-col xs="12" sm="12" md="12" class="">
                      <v-btn text route :to="this.classorevent"><v-icon>navigate_before</v-icon>{{classorevent}}</v-btn>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col xs="12" sm="12" md="12">
                  <v-card class="pa-4 text-uppercase" tile flat style="border-top: 1px solid black; border-bottom: 1px solid black;">
                    <h1 style="text-align:center" class="pb-2">{{eventName}}</h1>
                  </v-card>
                </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col style="border-bottom: 1px solid black;" class="pa-3" v-for="c in camp" :key="c.title">
                <v-btn route :to="c.src" text block >
                  <span class="text-uppercase" text>{{c.title}}</span>
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col xs="12" sm="12" md="12">
                <p style="text-align:center" class="pa-4">{{about}}</p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col xs="12" sm="12" md="12">
                <v-img aspect-ratio="1.7" :src="mainImg"></v-img>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col v-for="img in images1" :key="img" xs="2" sm="2" md="2">
                  <v-img aspect-ratio="1.7" :src="img" v-on:mouseover="onPhotoChange(img)"></v-img>
              </v-col>
            </v-row>
      </v-container>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
//import fb from '@/fb'
export default
{

    data(){
      return{
          mainImg: "",
          router: "/"+ this.classorevent,
          dbName: 'kidsCamp',
          subdbName: 'myEvents',
          eventName: "Kids Camp",
          classorevent: "Classes",
          camp: [{title: "Kids Camp", src: "/kids"}, {title: "Youth Camp", src: "/youth"}],
          about: "Introduce your child to the basics of fly fishing by enrolling them in our Fly Fishing Kids Camp. While exploring local waters including Boulder Creek, Wonderland Lake, and Pella Crossing, young anglers will build new friendships and experience nature as they develop enthusiasm for fly fishing. Our 3-day kids camp is intended for children ages 8 to 11 and runs from 8:30am to 4:30pm each day. So contact Rocky Mountain Anglers to obtain more information about our excellent summer camp program and register your child for any of our 3 sessions!",
          images1: [require("../../Photos/Kids Camp/IMG_1640.jpg"), require("../../Photos/Kids Camp/IMG_1626.jpg"), require("../../Photos/Kids Camp/IMG_1634.jpg"), require("../../Photos/Kids Camp/erikkidscamp.jpg"),require("../../Photos/Kids Camp//IMG_0057.jpg"), require("../../Photos/Kids Camp//IMG_0079.jpg")],
        }
    },
    methods:
    {
      onPhotoChange: function(img)
      {
        this.mainImg = img;
      }
    },
    created()
    {
      this.mainImg = this.images1[0];
    }
  }
</script>
