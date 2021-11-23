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
      Sites: ['BLUDILCO', 'BLUGRECO'],
      stationNames: [],
      FlowData: [],
      about: "The Blue is a true gem of a fishery in Summit County. This river originates as a freestone stream high in the mountains and culminates in a series of tailwater fisheries known for producing some of our area’s largest trout. The tailwater section below Dillon Reservoir is a Mysis shrimp fishery where, depending on flows, technical midge rigs can be the ticket. Downstream from Silverthorne, more solitude can be found on this tributary that feeds into the Colorado River.",
      cordinates:{lad:'39.880264', long: '-106.333918'},
      imageRef: require('../../Photos/RiverReport/blue.jpg'),
      mapRefs: [{name: "BLUE RIVER BELOW DILLON, CO.", mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3073.0738067302213!2d-106.06859668481407!3d39.625541979464984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDM3JzMyLjAiTiAxMDbCsDAzJzU5LjEiVw!5e0!3m2!1sen!2sus!4v1603827866714!5m2!1sen!2sus'},
                {name:"BLUE RIVER BELOW GREEN MOUNTAIN RESERVOIR, CO", mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3061.730957380667!2d-106.3361066848058!3d39.88026397943104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDUyJzQ5LjAiTiAxMDbCsDIwJzAyLjEiVw!5e0!3m2!1sen!2sus!4v1603827779341!5m2!1sen!2sus'}]
    }
  },
  created()
  {
    fb.db.collection('RiverReports').get().then((snapshot) =>
    {
      this.riverID = snapshot.docs[5].id
      this.ReportInfo = snapshot.docs[5].data()
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
