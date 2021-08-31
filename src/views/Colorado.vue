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
      Sites: ['COLKRECO', 'COLPARCO', 'COLGBYCO'],
      stationNames: [],
      FlowData: [],
      about: "One of our country’s most-known rivers, the Colorado shouldn’t be missed. This river is potentially the most diverse of them all, giving anglers the opportunity to find solitude and be one cast away from a trophy catch. Whether you are chasing the legendary salmon fly hatch or wanting to spend some time exploring its numerous canyon settings, we’ve got you covered! With great wade fishing, float fishing, and great camping access, make sure you check out the Collie.",
      cordinates:{lad:'40.036652', long: '-106.440032'},
      imageRef: require('../Photos/RiverReport/colo.jpg'),
      mapRefs: [{name: "COLORADO RIVER NEAR KREMMLING, CO", mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50108.17689396918!2d-106.49081226870453!3d40.0469066907862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDAyJzEyLjAiTiAxMDbCsDI2JzI0LjEiVw!5e0!3m2!1sen!2sus!4v1603828016421!5m2!1sen!2sus'},
      {name: "COLORADO RIVER NEAR PARSHALL BELOW W.F. CONFLUENCE", mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3053.567177343407!2d-106.19471568479972!3d40.062758979407825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDAzJzQ1LjkiTiAxMDbCsDExJzMzLjEiVw!5e0!3m2!1sen!2sus!4v1603833492078!5m2!1sen!2sus'},
    {name: "COLORADO RIVER BELOW LAKE GRANBY, CO.", mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.89857286425!2d-105.86943268479705!3d40.14454297939765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA4JzQwLjQiTiAxMDXCsDUyJzAyLjEiVw!5e0!3m2!1sen!2sus!4v1603833647263!5m2!1sen!2sus'}]
    }
  },
  created()
  {
    fb.db.collection('RiverReports').get().then((snapshot) =>
    {
      this.riverID = snapshot.docs[6].id
      this.ReportInfo = snapshot.docs[6].data()
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
