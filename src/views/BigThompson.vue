<template>
  <rivertemp v-bind:ReportInfo="ReportInfo" :FlowData="FlowData" :imageRef="imageRef" :cordinates="cordinates" :mapRefs="mapRefs" :about="about"></rivertemp>
</template>
<script>
import fb from '@/fb'
import rivertemp from '../components/RRtemplate.vue'
export default
{
  components:
  {
    rivertemp
  },

  data()
  {
    return{
      ReportInfo: {},
      Flows: [],
      Bugs:[],
      riverID: "",
      Sites: ['BTBLESCO', 'BTBMORCO', 'BTNFDRCO'],
      stationNames: [],
      FlowData: [],
      about: "The Big Thompson River is a short drive from Boulder and has almost 10 miles of access along highway 34 between Lake Estes and the town of Drake; and over half of this is public water.  There is another 10 miles of water between Drake and Loveland in the lower canyon, but as you get closer to Loveland the public access diminishes.  Great midges throughout the winter, and a wide variety of hatches through the summer keep this front range stream on everyones list. Evenings in the summertime can be a great time to visit this one.",
      cordinates:{lad:'40.376373', long: '-105.485553'},
      imageRef: require('../Photos/RiverReport/BigT.jpg'),
      mapRefs: [{name: "BIG THOMPSON RIVER BELOW LAKE ESTES", mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.465570487315!2d-105.4877416847894!3d40.376372979369826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDIyJzM0LjkiTiAxMDXCsDI5JzA4LjAiVw!5e0!3m2!1sen!2sus!4v1592772627649!5m2!1sen!2sus'},
                {name:"NORTH FORK BIG THOMPSON RIVER AT DRAKE, CO.", mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.8821686940055!2d-105.34803568478749!3d40.433607979363146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI2JzAxLjAiTiAxMDXCsDIwJzQ1LjEiVw!5e0!3m2!1sen!2sus!4v1592773011746!5m2!1sen!2sus'}]
    }
  },
  created()
  {
    fb.db.collection('RiverReports').get().then((snapshot) =>
    {
      this.riverID = snapshot.docs[3].id
      this.ReportInfo = snapshot.docs[3].data()
    });
    //loops through locations and gets Flow info
    var getFlow = require('../flows.js');
    var site = '';
    for(site of this.Sites)
    {
      getFlow.initalize(site).then((result) =>
      {
        this.FlowData.push(result.ResultList[0]);
      });

    }
    console.log(this.FlowData)
  }

}
</script>
