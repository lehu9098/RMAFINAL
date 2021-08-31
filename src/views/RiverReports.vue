<template>
    <v-layout justify-center>
      <v-flex xs12 sm12 md12>
        <v-container>
          <v-row no-gutters>
            <v-col xs="12" sm="12" md="12">
              <div class="pa-4 " style="border-bottom: 1px solid black; border-top: 1px solid black;">
                <h1 style="text-align:center;" class="text-uppercase">River Reports</h1>
              </div>
          </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col v-for="river in Rivers" :key="river.title" class="align-items-center pa-3" style="border-bottom: 1px solid black;" block>
              <v-btn route :to="river.src" text block>
                <span class="text-uppercase" text>{{river.title}}</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col xs="12" sm="12" md="12">
              <p class="pa-3"> {{about}}</p>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col xs="6" sm="6" md="6">
                <v-img class="white--text align-center box text-uppercase" src='../Photos/RiverReport/ark.jpg' lazy-src="../Photos/RiverReport/ark.jpg" height="50%"><a href="/Arkansas"><h1 class="overlayText">Arkansas River</h1></a></v-img>
                <v-img class="white--text align-center box text-uppercase" src='../Photos/RiverReport/blue.jpg' lazy-src="../Photos/RiverReport/blue.jpg"  height="50%"><a href="/BlueRiver"><h1 class="overlayText">Blue River</h1></a></v-img>
            </v-col>
            <v-col xs="6" sm="6" md="6">
                <v-img class="white--text align-center box text-uppercase" src='../Photos/RiverReport/BigT.jpg' lazy-src="../Photos/RiverReport/BigT.jpg"  height="50%"><a href="/BigThompson"><h1 class="overlayText">Big Thompson</h1></a></v-img>
                <v-img  class="white--text align-center box text-uppercase" src="../Photos/Boulder Creek Photots/MarkLewis-2248s.jpg" lazy-src="../Photos/Boulder Creek Photots/MarkLewis-2248s.jpg"  height="50%"><a href="/BoulderCreek"><h1 class="overlayText">Boulder Creek</h1></a></v-img>
            </v-col>
            <v-col xs="6" sm="6" md="6">
              <v-img class="white--text align-center box text-uppercase" src='../Photos/RiverReport/clear.jpeg' height="50%" lazy-src="../Photos/RiverReport/clear.jpeg" ><a href="/ClearCreek"><h1 class="overlayText">Clear Creek</h1></a></v-img>
              <v-img class="white--text align-center box text-uppercase" src='../Photos/RiverReport/eagle2.jpg' height="50%" lazy-src="../Photos/RiverReport/eagle2.jpg" ><a href="/Eagle"><h1 class="overlayText">Eagle River</h1></a></v-img>

            </v-col>
            <v-col xs="6" sm="6" md="6">
              <v-img class="white--text align-center box text-uppercase" src='../Photos/RiverReport/colo.jpg' height="50%" lazy-src="../Photos/RiverReport/colo.jpg" ><a href="/Colorado"><h1 class="overlayText">Colorado River</h1></a></v-img>
              <v-img class="white--text align-center box text-uppercase" src='../Photos/RiverReport/MorainePark.jpg' height="50%" lazy-src="../Photos/RiverReport/MorainePark.jpg" ><a href="/RMNP"><h1 class="overlayText">RMNP</h1></a></v-img>
            </v-col>
            <v-col xs="6" sm="6" md="6">
              <v-img  class="white--text align-center box text-uppercase" src="../Photos/RiverReport/sbc.jpg" height="50%" lazy-src="../Photos/RiverReport/sbc.jpg" ><a href="/SouthBoulderCreek"><h1 class="overlayText">South Boulder Creek</h1></a></v-img>
              <v-img class="white--text align-center box text-uppercase" src="../Photos/RiverReport/stvrain.jpg" height="50%" lazy-src="../Photos/RiverReport/stvrain.jpg" ><a href="/StVrain"><h1 class="overlayText">St. Vrain</h1></a></v-img>
            </v-col>
            <v-col xs="6" sm="6" md="6">
              <v-img class="white--text align-center box text-uppercase" src='../Photos/RiverReport/cheeseman.jpg' height="50%" lazy-src="../Photos/RiverReport/cheeseman.jpg" ><a href="/SouthPlatte"><h1 class="overlayText">South Platte</h1></a></v-img>
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
        Rivers: [
          { title: 'Arkansas River', src:'/Arkansas'},
          { title: 'Big Thompson', src:'/BigThompson' },
          { title: 'Blue River', src:'/BlueRiver'},
          { title: 'Boulder Creek', src: '/BoulderCreek' },
          { title: 'Clear Creek', src:'/ClearCreek'},
          { title: 'Colorado River', src:'/Colorado'},
          { title: 'Eagle River', src:'/Eagle'},
          { title: 'RMNP', src:'/RMNP'},
          { title: 'South Boulder Creek', src: '/SouthBoulderCreek'},
          { title: 'South Platte', src:'/SouthPlatte'},
          { title: 'St. Vrain', src:'/StVrain'},

      ],
          about: "Casting a fly in a tranquil mountain stream, feeling the tug on the line, and holding a beautiful rainbow trout makes us feel alive and intensely connected with nature. Fly fishing is our way of life and we are blessed with hundreds of nearby rivers and streams just a short distance away from Boulder. From the swift spring waters of the Clear Creek to the meandering bends of the South Platte, it's critical to consider fishing conditions in advance and prepare accordingly. We rely on our experienced guides who venture into the wild to let us know which rivers favor fly fishing, where fish are biting, and which fly patterns are most effective. Planning a successful fishing trip also requires knowledge of stream flows at various river points and an accurate weather forecast for a given destination. At Rocky Mountain Anglers, we are dedicated to providing all avid anglers with detailed and timely information about hatches, water, and weather conditions. So before you head out the door on your next fishing adventure, visit our web site to find valuable information that will prepare you for a successful trip. Have fun chasing after your next trophy trout and enjoy nature's beauty!"
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
