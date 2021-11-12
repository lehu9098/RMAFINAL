<template>
    <v-layout justify-center>
      <v-flex xs12 sm12 md12>
        <v-container>
          <v-row no-gutters>
            <v-col xs="12" sm="12" md="12">
              <div class="pa-4 " style="border-bottom: 1px solid black; border-top: 1px solid black;">
                <h1 style="text-align:center;" class="text-uppercase">Events</h1>
              </div>
          </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col v-for="event in eventItems" :key="event.title" class="align-items-center pa-3" style="border-bottom: 1px solid black;">
              <v-btn route :to="event.src" text block>
                <span class="text-uppercase" text>{{event.title}}</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col xs="6" sm="6" md="6">
                <v-img  class="white--text align-center box text-uppercase" src="../../Photos/Bugs and Brews/IMG_0715.jpg"><a href="/BugsandBrews"><h1 class="overlayText">Bugs 'N' Brews</h1></a></v-img>
                <v-img  class="white--text align-center box text-uppercase" src="../../Photos/CCU/IMG_4555.jpg"><a href="/CreekCleanUp"><h1 class="overlayText">Creek Clean Up</h1></a></v-img>
            </v-col>
            <v-col xs="6" sm="6" md="6">
              <v-img class="white--text align-center box text-uppercase" src="../../Photos/Fish Alongs/Chef.jpg" height="100%"><a href="/FishAlongs"><h1 class="overlayText">Fish Alongs</h1></a></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
</template>

<script>

export default
{
    data(){
      return{
        eventItems: [
        { title: 'Fish Alongs', src: '/FishAlongs' },
        { title: "Bugs 'N' Brews", src: '/BugsandBrews'},
        { title: 'Creek CleanUp', src:'/CreekCleanUp' },
          { title: 'Other', src:'/OtherEvents' }
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
