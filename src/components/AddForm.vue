<template>
  <v-container>
    <v-card raised>
    <v-alert type="success" v-if="success"> You successfully added an event </v-alert>
    <v-alert type="success" v-if="tweetSuccess"> You successfully tweeted </v-alert>
    <v-alert type="error" v-if="failed"> Something Went Wrong </v-alert>
      <v-layout row justify-center>
        <v-flex sm12 md8 >
        <v-form ref="form" class="pa-12">
          <h2 class="text-center">Add {{type}}</h2>
          <v-select :items="items" label="Add Event Location" v-model="location"></v-select>
          <label> Add {{type}} Title: </label>
          <v-text-field outlined v-model="title"> </v-text-field>
          <label> Add {{type}} Description: </label>
          <v-textarea outlined v-model="description"></v-textarea>
          <label> Add {{type}} Capacity: </label>
          <v-text-field outlined v-model="capacity"></v-text-field>
          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="date"
          transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field outlined v-model="date" label="Select Date" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title type="date"> <!--can add scrollable-->
              <v-spacer></v-spacer>
              <v-btn color="brown lighten-1 white--text" @click="menu = false">Cancel</v-btn>
              <v-btn color="brown lighten-1" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" :return-value.sync="picker"
          transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field outlined v-model="picker" label="Select Event Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
            </template>
                <v-time-picker color="brown" v-model="picker">
                <v-btn text color="brown lighten-1 white--text" @click="menu1 = false">Cancel</v-btn>
                <v-btn text color="brown lighten-1" @click="$refs.menu1.save(picker)">OK</v-btn>
                </v-time-picker>
          </v-menu>
          <!--for extra time slots-->
          <v-btn @click="extraSlots = true" text outlined block class="mb-2">Add extra class/event times</v-btn>
          <div v-if="extraSlots">
          <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="picker2"
            transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field outlined v-model="picker2" label="Select Event Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
              </template>
                  <v-time-picker color="brown" v-model="picker2">
                  <v-btn text color="brown lighten-1 white--text" @click="menu2 = false">Cancel</v-btn>
                  <v-btn text color="brown lighten-1" @click="$refs.menu2.save(picker2)">OK</v-btn>
                  </v-time-picker>
          </v-menu>
          <v-menu ref="menu3" v-model="menu3" :close-on-content-click="false" :nudge-right="40" :return-value.sync="picker3"
          transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field outlined v-model="picker3" label="Select Event Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
            </template>
                <v-time-picker color="brown" v-model="picker3">
                <v-btn text color="brown lighten-1 white--text" @click="menu3 = false">Cancel</v-btn>
                <v-btn text color="brown lighten-1" @click="$refs.menu3.save(picker3)">OK</v-btn>
                </v-time-picker>
          </v-menu>
          <v-menu ref="menu4" v-model="menu4" :close-on-content-click="false" :nudge-right="40" :return-value.sync="picker4"
          transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field outlined v-model="picker4" label="Select Event Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
            </template>
                <v-time-picker color="brown" v-model="picker4">
                <v-btn text color="brown lighten-1 white--text" @click="menu4 = false">Cancel</v-btn>
                <v-btn text color="brown lighten-1" @click="$refs.menu4.save(picker4)">OK</v-btn>
                </v-time-picker>
          </v-menu>
          <v-menu ref="menu5" v-model="menu5" :close-on-content-click="false" :nudge-right="40" :return-value.sync="picker5"
          transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field outlined v-model="picker5" label="Select Event Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
            </template>
                <v-time-picker color="brown" v-model="picker5">
                <v-btn text color="brown lighten-1 white--text" @click="menu5 = false">Cancel</v-btn>
                <v-btn text color="brown lighten-1" @click="$refs.menu5.save(picker5)">OK</v-btn>
                </v-time-picker>
          </v-menu>
          <v-menu ref="menu6" v-model="menu6" :close-on-content-click="false" :nudge-right="40" :return-value.sync="picker6"
          transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field outlined v-model="picker6" label="Select Event Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
            </template>
                <v-time-picker color="brown" v-model="picker6">
                <v-btn text color="brown lighten-1 white--text" @click="menu6 = false">Cancel</v-btn>
                <v-btn text color="brown lighten-1" @click="$refs.menu6.save(picker6)">OK</v-btn>
                </v-time-picker>
          </v-menu>
          </div>
          <v-file-input type="file" v-model="file" accept="image/*" lable="upload Image" prepend-icon="mdi-camera"></v-file-input>

          <v-btn text dark class="black" block v-on:click="postEvent(location)" :disabled="disable"> Add {{type}}</v-btn>
    </v-form>

        </v-flex>
      </v-layout>
</v-card>
    </v-container>
</template>
<script>
import fb from '@/fb'

export default {

  props:{
    type:
    {
      type: String,
      required: true
    },
    dbName:
    {
      type: String,
      required: true
    },
    items:
    {
      type: Array,
      required: true
    }
  },
  data(){
    return{
      extraSlots: false,
      menu: false,
      menu1:false,
      menu2: false,
      picker2: "",
      menu3: false,
      picker3: "",
      menu4: false,
      picker5: "",
      menu5: false,
      picker6: "",
      menu6: false,
      picker4: "",
      date: "",
      picker: "",
      title: "",
      description: "",
      selectedFile: null,
      success: false,
      failed: false,
      file: null,
      picture: null,
      about: {},
      location: "",
      currentDB: "",
      tweet: "",
      tweetSuccess: false,
      capacity: "",
      id: "",
      disable: false
    }
  },
  methods:{
    createDateSlots(){
      var slots = [];
      slots.push(this.picker);
      if(this.picker2 != ""){
        slots.push(this.picker2);
      }
      if(this.picker3 != ""){
        slots.push(this.picker3);
      }
      if(this.picker4 != ""){
        slots.push(this.picker4);
      }
      if(this.picker5 != ""){
        slots.push(this.picker5);
      }
      if(this.picker6 != ""){
        slots.push(this.picker6);
      }
      return slots;
    },
    postEvent: function(dbName)
    {
      this.disable = true;

    fb.storage.ref(this.file.name).put(this.file).then((snapshot)=>
    {
        snapshot.ref.getDownloadURL().then((url)=>{
          this.picture = url;
          this.about = {
              title: this.title,
              description: this.description,
              date: this.date,
              time: this.createDateSlots(),
              image: this.picture,
              catagory: this.location,
              capacity: Number(this.capacity),
              reminderSend: false
              }
              console.log(this.about);
              fb.db.collection(dbName).add(this.about).then(() => {
                  fb.db.collection(dbName).where("title", "==", this.title).get().then((snapshot) => {
                    snapshot.docs.forEach((doc) => {
                      this.id = doc.id;
                    })
                  }).then(() => {
                    fb.db.collection('upcomingEvent').doc(this.id).set(this.about).then(() => {
                      this.success = true;
                      this.disable = false;
                    })
                  })
                })

        })
      })

    }

  },
}

</script>
