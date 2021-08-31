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
      Sites: ['SVCLYOCO', 'SSVWARCO', 'NSVBBRCO', 'MIDSTECO'],
      stationNames: [],
      FlowData: [],
      about: "The St. Vrain and its many forks flow through the town of Lyons and offer unique angling opportunities right on the Front Range. With headwaters in Rocky Mountain National Park, the North St. Vrain is popularly accessed at the Wild Basin entrance, a small stream setting that can be extremely productive with small attractor dries. Brook trout and brown trout will be the main target here, with cutthroat also present. The South St. Vrain is accessed just outside the town of Lyons and also has great fishing opportunities by using pull-offs and parking areas as your way to the water. As all these forks meet in the town of Lyons, you can fish the main stem of the St. Vrain right through town, where deeper pools and runs are home to many trout! Give this local stream a shot if you haven’t, especially if you want to be in a pretty area with gorgeous mountain views and willing trout.",
      cordinates:{lad:'40.218043', long: '-105.260001'},
      imageRef: require("../Photos/RiverReport/stvrain.jpg"),
      mapRefs: [{name: "NORTH SAINT VRAIN CREEK BELOW BUTTONROCK  (RALPH PRICE) RESERVOIR", mapRef: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.7034990261295!2d-105.36561068479469!3d40.215657979388936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDEyJzU2LjQiTiAxMDXCsDIxJzQ4LjMiVw!5e0!3m2!1sen!2sus!4v1592503191094!5m2!1sen!2sus"},
                {name:"MIDDLE SAINT VRAIN AT PEACEFUL VALLEY", mapRef:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3050.560093205826!2d-105.51929968479756!3d40.1298059793995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA3JzQ3LjMiTiAxMDXCsDMxJzAxLjYiVw!5e0!3m2!1sen!2sus!4v1592502814734!5m2!1sen!2sus"},
              {name:"SOUTH SAINT VRAIN NEAR WARD", mapRef: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2726.402897388244!2d-105.51611187738058!3d40.09104290096642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDA1JzI3LjAiTiAxMDXCsDMwJzUyLjAiVw!5e0!3m2!1sen!2sus!4v1592503088511!5m2!1sen!2sus"},
            {name:"SAINT VRAIN CREEK AT LYONS, CO", mapRef: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.596263732503!2d-105.26218968479465!3d40.21804297938875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDEzJzA1LjAiTiAxMDXCsDE1JzM2LjAiVw!5e0!3m2!1sen!2sus!4v1592501175740!5m2!1sen!2sus"}]
    }
  },
  created()
  {
    fb.db.collection('RiverReports').get().then((snapshot) =>
    {
      this.riverID = snapshot.docs[1].id
      this.ReportInfo = snapshot.docs[0].data()
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
