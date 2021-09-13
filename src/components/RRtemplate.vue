<template>
  <div class="RiverReports">
    <v-container >
      <v-layout row wrap justify-center>
        <v-row no-gutters>
            <v-col xs="12" sm="12" md="12">
                  <v-btn text route to="/RiverReports"><v-icon>navigate_before</v-icon>Back</v-btn>
            </v-col>
        </v-row>
        <v-flex xs11 sm11 md12>
        <v-card flat class="mb-2">
          <v-img :src=imageRef aspect-ratio="1.7" class="responsive"></v-img>
        </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex xs11 sm11 md12>
          <v-card flat tile height="150" class="pa-2 mx-2 mt-2 card-overflow" style="border-top: .5px solid grey;" scrollable>
            <h2 style="text-align:center;" class="font-weight-light"><b>About {{ReportInfo.River}}</b></h2>
            <p>{{about}}</p>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex xs11 sm11 md7>
          <v-card flat tile height="300" class="pa-2 mx-2 card-overflow border-thing" scrollable>
            <h2 style="text-align:center;" class="font-weight-light"><b>River Report</b></h2>
            <v-card-subtitle><b>By: </b>{{ReportInfo.Author}}<br />  <b> Updated On: </b>{{ReportInfo.date}}</v-card-subtitle>
            <v-card-text>{{ReportInfo.Report}}</v-card-text>
          </v-card>
            </v-flex>
            <v-flex xs11 sm11 md5>
              <v-card flat height="300px" class="mx-2 pa-2 card-overflow" style="border: .5px solid grey">
                <h2 style="text-align:center;" class="font-weight-light"><b>Flies to use</b></h2>
                <v-card-text>{{ReportInfo.Flies}}</v-card-text>
              </v-card>
            </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex xs11 sm6 md3 v-for="day in weather" :key="day.date">
          <v-card outlined max-height="220" class="pa-2 ma-2">
            <v-img :src="day.link" alt="HTML5 Icon" style="width:64px;height:64px;" ></v-img>
            <v-card-title>{{day.date}}</v-card-title>
            <v-card-subtitle class="pb-0"><b>Conditions:</b> {{day.description}}</v-card-subtitle>
            <v-card-text><b>High:</b> {{day.max}}<br/><b>Low:</b> {{day.min}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex xs11 sm5 md5>
        <v-card outlined class="mx-2 " max-height="300">
        <v-simple-table>
            <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Location</th>
              <th class="text-left">Flow (CFS)</th>
            </tr>
          </thead>
          <tbody v-for="data in FlowData" :key="data.stationName">
            <tr>
              <td><v-btn text class="texts" v-on:click="changeMap(data.stationName)">{{data.stationName}}</v-btn></td>
              <td>{{data.measValue}} </td>
            </tr>
          </tbody>
        </template>
        </v-simple-table>
        </v-card>
      </v-flex>
        <v-flex xs11 sm7 md7>
        <v-card outlined height="500px" class="mx-2">
          <iframe :src="currentMap" height="500px" width="100%" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>


export default {

  props:{
    ReportInfo:
    {
      type: Object,
      required: true //if the type passed in isnt array doesnt wprl
    },
    FlowData:
    {
      type: Array,
      required: true,
    },
    imageRef:
    {
      required: true
    },
    cordinates: {
      type: Object,
      required: true
    },
    mapRefs:
    {
      type: Array,
      required: true
    },
    about:
    {
      type: String,
      required: true
    }
  },
  data(){
    return{
      imgInput:"",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      weather: [],
      currentMap: "",
      stars: 4,
  }
},
  methods:
  {
    changeMap:function(name)
    {
      //console.log(name)
      var site = '';
      for(site of this.mapRefs)
      {
        //console.log(site)
        if(name == site.name)
        {
          this.currentMap = site.mapRef;
        }
      }

    }
  },
  created()
  {

    var getFlow = require('../flows.js');
    getFlow.weather(this.cordinates.lad, this.cordinates.long).then((result)=>{

      //console.log(result.daily.temp.day)
      //var currentTemp = Math.round(((result.daily[0].temp.day - 273.15) * 9/5) + 32);
      result.daily.forEach(day => {
        var dateObj = new Date(day.dt * 1000);
        var utcString = dateObj.toUTCString();
        var time = utcString.slice(0, -18);
        var icon = day.weather[0].icon
        this.weather.push({
          min: day.temp.min,
          max: day.temp.max,
          windSpeed: day.wind_speed,
          description: day.weather[0].description,
          catagory: day.weather[0].main,
          date: time,
          link: 'http://openweathermap.org/img/wn/'+ icon +'@2x.png'

        })
      })
    });
    this.currentMap = this.mapRefs[0].mapRef;

  //console.log(document.cookie)



  }

}

</script>
<style scoped>
.card-overflow
{
  overflow: scroll;

}
.border-thing
{
  border-top: .5px solid grey;
  border-bottom: .5px solid grey;
}
.texts
{
  font-size: 10px;
}
.responsive
{
  max-width: 100%;
}


</style>
