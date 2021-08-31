<template>
  <div>
    <v-img aspect-ratio="1.9" src="../Photos/Logo/FullSizeRender.jpg" class="d-none d-md-flex d-sm-flex">
      <v-card width="40%" height="100%" style="background-color: transparent; margin-left: 60%;">
          <v-overlay absolute opacity=".4" class="pa-6 card-overflow">
              <h3 style="text-align: center;">BOOK YOUR NEXT FLY FISHING ADVENTURE TODAY!</h3>
              <br/>
              <p class="d-none d-sm-flex">  Enjoy a guided fly fishing trip and discover the beauty and excitement Colorado can offer as you watch subtle gray shadows in the water turn into colorful works of art while catching rainbow trout! With the help of our expert guides, you will effortlessly reconnect with nature as you experience the trip of a lifetime.  </p>
              <v-btn block route to="/GuideTrips">Book Now</v-btn>
          </v-overlay>
        </v-card>
    </v-img>
    <v-img height="200px" aspect-ratio="1.7" src="../Photos/Logo/FullSizeRender.jpg" class="d-md-none d-sm-none">
      <v-card width="50%" height="100%" style="background-color: transparent; margin-left:50%;">
          <v-overlay absolute opacity=".5" class="pa-6 card-overflow">
              <h5 style="text-align: center;">BOOK YOUR NEXT FLY FISHING ADVENTURE TODAY!</h5>
              <br/>
              <p class="d-none d-sm-flex">  Enjoy a guided fly fishing trip and discover the beauty and excitement Colorado can offer as you watch subtle gray shadows in the water turn into colorful works of art while catching rainbow trout! With the help of our expert guides, you will effortlessly reconnect with nature as you experience the trip of a lifetime.  </p>
              <v-btn block route to="/GuideTrips">Book Now</v-btn>
          </v-overlay>
        </v-card>
    </v-img>
  </div>
</template>
<script>
export default {

}
</script>
