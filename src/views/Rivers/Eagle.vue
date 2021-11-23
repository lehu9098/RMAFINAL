<template>
  <rivertemp v-bind:ReportInfo="ReportInfo" :FlowData="FlowData" :imageRef="imageRef" :cordinates="cordinates" :mapRefs="mapRefs" :about="about"></rivertemp>
</template>
<script>
import fb from '@/fb'
import rivertemp from '../../components/RRtemplate.vue'
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
      Sites: ['EAGMILCO', 'EAGGYPCO'],
      stationNames: [],
      FlowData: [],
      about: "A tributary of the Colorado River, the Eagle remains as one the last true freestone rivers.  Hard fighting rainbows and browns will test your gear, and even your skillset as an angler.  Highway 6 will allow you to access many beats, and dispersed camping is always a bonus.  Give this river a shot if you are heading over Vail pass and want to get some!",
      cordinates:{lad:'39.705', long: '-106.725833'},
      imageRef: require('../../Photos/RiverReport/eagle2.jpg'),
      mapRefs: [{name: "EAGLE RIVER BELOW MILK CREEK NEAR WOLCOTT, CO", mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3069.5420251414653!2d-106.72802168481145!3d39.70499997945423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDQyJzE4LjAiTiAxMDbCsDQzJzMzLjAiVw!5e0!3m2!1sen!2sus!4v1603917026459!5m2!1sen!2sus'},
    {name: "EAGLE RIVER BELOW GYPSUM, CO.", mapRef:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3797.320784903974!2d-106.95512878794362!3d39.649688571376814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDM4JzU4LjAiTiAxMDbCsDU3JzEzLjIiVw!5e0!3m2!1sen!2sus!4v1603917166684!5m2!1sen!2sus'}]
    }
  },
  created()
  {
    fb.db.collection('RiverReports').get().then((snapshot) =>
    {
      this.riverID = snapshot.docs[7].id
      this.ReportInfo = snapshot.docs[7].data()
    });
    //loops through locations and gets Flow info
    var getFlow = require('../../flows.js');
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
