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
      Sites: ['BOCOROCO', 'BOCMIDCO'],
      FlowData: [],
      cordinates:{lad:'40.0086', long: '-105.331'},
      imageRef: require('../../Photos/Boulder Creek Photots/MarkLewis-2248s.jpg'),
      mapRefs: [{name: "BOULDER CREEK NEAR ORODELL, CO.", mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7593.790772726956!2d-105.33195199271685!3d40.008653524872635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDAwJzIzLjAiTiAxMDXCsDE5JzUxLjAiVw!5e0!3m2!1sen!2sus!4v1587488096219!5m2!1sen!2sus'},
                {name:"MIDDLE BOULDER CREEK AT NEDERLAND, CO.", mapRef: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1975.8737485566396!2d-105.50591828061874!3d39.96152734001826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU3JzQyLjAiTiAxMDXCsDMwJzE0LjAiVw!5e0!3m2!1sen!2sus!4v1591129207472!5m2!1sen!2sus"}],
      about: "Just blocks from the shop, Boulder Creek is our home water with great access through town as well as  the many pull offs along HWY 119 throughout Boulder Canyon.  Chocked full of trout averaging 8-12 inches, these browns and rainbows are known for their willingness to attack a fly throughout much of the year.  This small stream can be fished effectively most often with a dry dropper set up, and has great hatches March- October."

    }
  },
  created()
  {
    fb.db.collection('RiverReports').get().then((snapshot) =>
    {
      this.riverID = snapshot.docs[2].id
      this.ReportInfo = snapshot.docs[2].data()
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
  }

}
</script>
