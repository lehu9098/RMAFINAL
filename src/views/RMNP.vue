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
      Sites: ['BTBMORCO'],
      stationNames: [],
      FlowData: [],
      about: "The Park is our bread and butter for spring-fall fishing in the high country, with high alpine lakes full of native greenback cutts, small streams filled with eager brook trout, larger browns lurking under cut-banks, and much more. A backdrop of beautiful mountain scenery is a constant when fishing the small streams and stillwater fisheries the Park has to offer, and sightings of wild animals like elk, moose, and even the occasional big horn sheep are common. RMNP is renowned for its dry fly fishing, which tends to peak from roughly July to September when we’ve passed the high-water runoff period of spring and beetles, ants, hoppers, caddis, and other bugs are in abundant supply for these wild, self-sustaining trout. A shop favorite on full-day guide trips is to go for the “Rocky Mountain Grand Slam” – catching all four available trout species of brook, brown, rainbow, and cutthroat in a single day.",
      cordinates:{lad:'40.353873', long: '105.584168'},
      imageRef: require('../Photos/RiverReport/MorainePark.jpg'),
      mapRefs: [{name: "BIG THOMPSON BL MORAINE PARK NR ESTES PARK, CO", mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.4803169420684!2d-105.58635668485906!3d40.35387297937243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDIxJzEzLjkiTiAxMDXCsDM1JzAzLjAiVw!5e0!3m2!1sen!2sus!4v1605750019030!5m2!1sen!2sus'}]
    }
  },
  created()
  {
    fb.db.collection('RiverReports').get().then((snapshot) =>
    {
      this.riverID = snapshot.docs[9].id
      this.ReportInfo = snapshot.docs[9].data()
    });
    //loops through locations and gets Flow info
    var getFlow = require('../flows.js');
    var site = '';
    for(site of this.Sites)
    {
      //console.log(site)
      getFlow.initalize(site).then((result) =>
      {
        this.FlowData.push(result.ResultList[0]);
      });

    }
    //console.log(this.FlowData)
  }

}
</script>
