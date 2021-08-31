<template>
  <div class="ma-2">
      <v-card flat tile @mouseover="showOverlay =! showOverlay" @mouseout="showOverlay =! showOverlay">
        <v-img  class="white--text align-center pa-4 box" :src="item.src" :lazy-src="item.src" aspect-ratio="1.4" @click="show = !show">
          <v-btn text block class="white--text" :href="item.url"><v-icon x-large>{{item.title}}</v-icon></v-btn>
        </v-img>
      </v-card>
      <!-- this is the flip card component piece-->
      <!--<v-card class="ma-2" v-if="show">
        <v-btn text v-on:click="show = !show"><v-icon>mdi-keyboard-backspace</v-icon></v-btn>
        <h2 style="text-align: center;">{{item.title}}</h2>
        <v-card-text>{{item.description}}</v-card-text>
        <v-btn text block route :to="item.url"><h3 class=" black--text border-under" style="text-align: center;">Check Out Our {{item.title}} Here</h3></v-btn>
      </v-card> -->
</div>
</template>
<script>
export default
{
  props:{
    item:
    {
      type: Object,
      required: true //if the type passed in isnt array doesnt wprl
    }
  },
  data(){
    return{
      show: false,
      showOverlay: false
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


</style>
