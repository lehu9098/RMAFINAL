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
      Sites: ['PLACHECO'],
      stationNames: [],
      FlowData: [],
      about: "Perhaps one of the most-known stretches of water close to Denver, the South Platte should be on your list. Fooling a well-educated trout on light tackle is always something to brag about, and this is where you can get that done. Impressive hatches and gorgeous scenery are just some of the reasons to venture out to the Platte. Whether you’re looking for world-class nymph fishing or the chance to present a small dry fly to a trophy-sized trout sipping on the surface, this river has something for you.",
      cordinates:{lad:'39.209275', long: '-105.268136'},
      imageRef: require('../Photos/RiverReport/cheeseman.jpg'),
      mapRefs: [{name: "SOUTH PLATTE RIVER BELOW CHEESMAN RESERVOIR ", mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5999.635623457982!2d-105.26987044723136!3d39.20986934683221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDEyJzMzLjQiTiAxMDXCsDE2JzA1LjMiVw!5e0!3m2!1sen!2sus!4v1603813047667!5m2!1sen!2sus'}]
    }
  },
  created()
  {
    fb.db.collection('RiverReports').get().then((snapshot) =>
    {
      this.riverID = snapshot.docs[4].id
      this.ReportInfo = snapshot.docs[4].data()
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
