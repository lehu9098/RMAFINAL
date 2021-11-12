<template>
    <v-layout justify-center>
      <v-flex xs12 sm12 md12>
        <v-container>
          <v-row no-gutters>
            <v-col xs="12" sm="12" md="12">
              <div class="pa-4 " style="border-bottom: 1px solid black; border-top: 1px solid black;">
                <h1 style="text-align:center;" class="text-uppercase">Classes</h1>
              </div>
          </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col v-for="event in classItems" :key="event.title" style="border-bottom: 1px solid black;" class="pa-3">
              <v-btn route :to="event.src" text block >
                <span class="text-uppercase" text>{{event.title}}</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col xs="6" sm="6" md="6">
                <v-img  class="white--text align-center box text-uppercase" src="../../Photos/Guidetrips/IMG_3810.jpg"><a href="/IntroClasses"><h1 class="overlayText">Intro Classes</h1></a></v-img>
                <v-img  class="white--text align-center box text-uppercase" src="../../Photos/fish photos/272I7615.jpg"><a href="/TyingClasses"><h1 class="overlayText">Tying Classes</h1></a></v-img>
            </v-col>
            <v-col xs="6" sm="6" md="6">
              <v-img class="white--text align-center box text-uppercase" src="../../Photos/Kids Camp/IMG_1626.jpg" height="100%"><a href="/KidsCamp"><h1 class="overlayText">Kids Camp</h1></a></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
</template>

<script>
//import fb from '@/fb'

export default
{

    data(){
      return{
        classItems: [
        { title: 'Intro to Fly Fishing', src: '/IntroClasses' },
        { title: 'Tying Classes', src: '/TyingClasses'},
        { title: 'Kids Camps', src:'/KidsCamp' },
        { title: 'One-on-One', src:'/OneOnOne' },
        { title: 'Other', src:'/OtherClasses' },

      ],
    }
    }
  }
</script>
<style scoped>
.box{
  filter: brightness(100%);
}
.box:hover
{
  filter: brightness(50%);
}
a
{
  text-decoration: none;
}
.overlayText
{
  text-align: center;
  color: white;
}
</style>
