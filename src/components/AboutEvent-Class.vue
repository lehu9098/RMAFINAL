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
  props:{
    about:
    {
      type: String,
      required: true
    },
    eventName:
    {
      type: String,
      required: true
    },
    images1:
    {
      type:Array,
      required:true
    },
    classorevent:{
      type: String,
      required: true
    }

  },
  data () {
    return {
      mainImg: "",
      router: "/"+ this.classorevent
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
<style scoped>
.align
{

}
</style>
