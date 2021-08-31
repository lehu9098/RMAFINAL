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
      Sites: ['CLEGOLCO', 'CLELAWCO'],
      stationNames: [],
      FlowData: [],
      about: "Here is a great local fishery that is especially convenient for Denver residents who are looking to get out for a nice day session close to home. While overlooked by some due to its proximity to highways, Clear Creek is a great fishery where wild browns and ‘bows tend to be eager takers on the dry fly and on dry-dropper rigs. The sections in Clear Creek Canyon between Golden to the I-70 corridor are the closest option, but don’t miss out on publically accessible stretches of water located up toward Idaho Springs, Georgetown, and beyond. This is another pocket water paradise where you’ll often find best numbers caught by presenting the fly to as many as fish possible and working through a lot of pockets and pools, maximizing the numbers of potential takers that are seeing your flies.",
      cordinates:{lad:'39.753043', long: '-105.235267'},
      imageRef: require('../Photos/RiverReport/clear.jpeg'),
      mapRefs: [{name: "CLEAR CREEK AT GOLDEN, CO", mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.4037260544833!2d-105.23745568487952!3d39.75304297944781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDQ1JzExLjAiTiAxMDXCsDE0JzA3LjAiVw!5e0!3m2!1sen!2sus!4v1605750454450!5m2!1sen!2sus'},
                {name: 'CLEAR CREEK NEAR LAWSON, CO', mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.8346393497527!2d-105.62830068487908!3d39.765820979446154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDQ1JzU3LjAiTiAxMDXCsDM3JzM0LjAiVw!5e0!3m2!1sen!2sus!4v1605819758842!5m2!1sen!2sus'}]
    }
  },
  created()
  {
    fb.db.collection('RiverReports').get().then((snapshot) =>
    {
      this.riverID = snapshot.docs[10].id
      this.ReportInfo = snapshot.docs[10].data()
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
