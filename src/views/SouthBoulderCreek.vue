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
      weather: [],
      Bugs:[],
      about: "We call the SBC tailwater “the bug factory” and she really hits her “buggy” prime in late July through September with drakes, PMD’s, caddis, quills, and stoneflies.  Flows can fluctuate dramatically through this stretch of water, so be sure to check flows before you go.  Only 12 miles from the shop, the Walker Ranch stretch of water can have you feeling 100 miles from anywhere.  A great spot to hike away from the crowds for more of a wilderness experience.",
      riverID: "",
      Sites: ['BOCBGRCO','MOFTUNCO','BOCELSCO'],
      FlowData: [],
      cordinates: {lad:'39.940490',long:'-105.344903'},
      imageRef: require("../Photos/RiverReport/sbc.jpg"),
      mapRefs:[{name:'SOUTH BOULDER CREEK BELOW GROSS RESERVOIR', mapRef:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1529.5509565790776!2d-105.34762502409225!3d39.93910999483063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU2JzIwLjgiTiAxMDXCsDIwJzQ3LjUiVw!5e0!3m2!1sen!2sus!4v1587488878041!5m2!1sen!2sus"},
      {name: 'MOFFAT WATER TUNNEL AT EAST PORTAL, CO.', mapRef:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.949604125498!2d-105.64734290218865!3d39.90214551078216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876bc9d493ce876b%3A0x2d9b60fa8b908e34!2sMoffat%20Tunnel%20-%20East%20Portal!5e0!3m2!1sen!2sus!4v1591123447601!5m2!1sen!2sus"},
      {name :'SOUTH BOULDER CREEK NEAR ELDORADO SPRINGS, CO.', mapRef: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.378332169922!2d-105.30744148511347!3d39.93292629284542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU1JzU4LjUiTiAxMDXCsDE4JzE4LjkiVw!5e0!3m2!1sen!2sus!4v1591123600048!5m2!1sen!2sus"}],}
  },
  created()
  {
    fb.db.collection('RiverReports').get().then((snapshot) =>
    {
      this.riverID = snapshot.docs[1].id
      this.ReportInfo = snapshot.docs[1].data()
    });

    var getFlow = require('../flows.js');
    var site = '';

    for(site of this.Sites)
    {

      getFlow.initalize(site).then((result) =>
      {
        this.FlowData.push(result.ResultList[0],);

     });
    }




  }

}
</script>
