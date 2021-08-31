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
      about: "Stemming from up high at Leadville, this river has a bit of it all for any angler. Wild trout forage on prolific hatches ranging from the legendary golden stone to insane numbers of caddis flies, and much more in between. Whether you are stalking the small water by foot or floating down some heavy whitewater, the Arkansas is a special river that we all adore.",
      Sites: ['ARKSALCO', 'ARKLEACO', 'ARKPUECO'],
      stationNames: [],
      FlowData: [],

      cordinates:{lad:'39.545', long: '-106.0107'},
      imageRef: require('../Photos/RiverReport/ark.jpg'),
      mapRefs: [{name: "ARKANSAS RIVER AT SALIDA, CO.", mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3120.4736374523063!2d-106.01288868491969!3d38.54589997962638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDMyJzQ1LjIiTiAxMDbCsDAwJzM4LjUiVw!5e0!3m2!1sen!2sus!4v1605748995102!5m2!1sen!2sus'},
                {name:"ARKANSAS RIVER NEAR LEADVILLE, CO", mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3089.7300176604317!2d-106.35018868489641!3d39.24899997951796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDE0JzU2LjQiTiAxMDbCsDIwJzUyLjgiVw!5e0!3m2!1sen!2sus!4v1605748948303!5m2!1sen!2sus'},
                {name: 'ARKANSAS RIVER ABOVE PUEBLO', mapRef: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.3474914223384!2d-104.72073968492866!3d38.271436979671954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDE2JzE3LjIiTiAxMDTCsDQzJzA2LjgiVw!5e0!3m2!1sen!2sus!4v1605819907016!5m2!1sen!2sus'}]
    }
  },
  created()
  {
    fb.db.collection('RiverReports').get().then((snapshot) =>
    {
      this.riverID = snapshot.docs[8].id
      this.ReportInfo = snapshot.docs[8].data()
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
