<template>
  <div class="my-4">
    <v-row no-gutters>
      <v-col md='12'>
        <h2 style="border-bottom: 1px solid black; border-top: 1px solid black; text-align:center;" class="pa-4 font-weight-light"><strong>Our Brands</strong></h2>
      </v-col>
    </v-row>
  <v-row no-gutters class="flex-nowrap" style="overflow: hidden">
    <v-col  xs='1' sm='1' md='1' >
      <div class="centerV" v-on:click="toggleLeft()">
        <v-btn text><v-icon x-large>keyboard_arrow_left</v-icon></v-btn>
      </div>
    </v-col>
    <v-row no-gutters class="flex-nowrap" style="overflow: hidden">
      <v-col xs='3' sm='3' md='3' v-for="(img, index) in images" :key="index">
        <div class="centerV">
          <v-img :src="img"></v-img>
        </div>
      </v-col>
    </v-row>
    <v-col md='1'>
      <div class="centerV"  v-on:click="toggleRight()">
        <v-btn text><v-icon x-large>keyboard_arrow_right</v-icon></v-btn>
      </div>
    </v-col>
  </v-row>
  <!--<v-row no-gutters>
    <v-col>
      <v-btn text><v-icon x-large>keyboard_arrow_left</v-icon></v-btn>
    </v-col>
    <v-col class="space">
      <v-btn text><v-icon x-large>keyboard_arrow_right</v-icon></v-btn>
    </v-col>
  </v-row>-->
    </div>

</template>
<script>
export default
{
  /*props:{
    images:
    {
      type: Array
    }
  }*/
  data(){
    return{
      images: [
        require("../Photos/companylogos/RIO_Logo_Shield_Yellow on Blue.png"),
        require("../Photos/companylogos/Redington_Logo_Red.png"),
        require("../Photos/companylogos/Sage_Logo_Steel.png"),
        require("../Photos/companylogos/scott-logo-lg.png"),
        require("../Photos/companylogos/Patagonia_logo.png"),
        require("../Photos/companylogos/echo-full.png"),
        require("../Photos/companylogos/nautilus-reels-1.png"),
        require("../Photos/companylogos/costa.png"),
        require("../Photos/companylogos/GLoomis copy.png"),
        require("../Photos/companylogos/lamson.jpg")

      ]
    }
  },
  methods:
  {
    toggleLeft: function()
    {
        var lastElementIndex = this.images.length - 1;
        var pushImage = this.images[lastElementIndex];
        this.images.pop();
        this.images.unshift(pushImage);
    },
    toggleRight: function()
    {

        var pushImage = this.images[0];
        this.images.shift();
        this.images.push(pushImage);
    }
  }


}


</script>
<style scoped>
.centerV
{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding: 5%;
}
.space{
  display: flex;
  justify-content: flex-end;
}
.title{
  text-align: center;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
}
</style>
