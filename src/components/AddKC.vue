<template>
  <v-container>
    <v-card raised>
    <v-alert type="success" v-if="success"> You successfully added an a Kids Camp Session </v-alert>
    <v-alert type="error" v-if="failed"> Something Went Wrong </v-alert>
      <v-layout row justify-center>
        <v-flex sm12 md8 >
        <v-form ref="form" class="pa-12">
          <h2 class="pa-4" style="text-align: center;">Add Kids Camp</h2>
          <v-select v-model="type" label="Select Camp Type" :items="types" outlined> <!-- Holds the data in select because you can only choose one-->
          </v-select>
          <label> Add Kids Camp Session: </label>
          <v-text-field outlined v-model="title"> </v-text-field>
          <label> Add Camp Description: </label>
          <v-textarea outlined v-model="description"></v-textarea>
          <label> Add Camp Age Group: </label>
          <v-text-field outlined v-model="ageGroup" placeholder="EX: 9-11"></v-text-field>
          <label> Select Start Date: </label>
          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="date"
          transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field outlined v-model="date" label="Select Start Date" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title type="date"> <!--can add scrollable-->
              <v-spacer></v-spacer>
              <v-btn color="brown lighten-1 white--text" @click="menu = false">Cancel</v-btn>
              <v-btn color="brown lighten-1" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <label> Select End Date: </label>
          <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :nudge-right="40" :return-value.sync="date1"
          transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field outlined v-model="date1" label="Select End Date" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date1" no-title type="date"> <!--can add scrollable-->
              <v-spacer></v-spacer>
              <v-btn color="brown lighten-1 white--text" @click="menu1 = false">Cancel</v-btn>
              <v-btn color="brown lighten-1" @click="$refs.menu1.save(date1)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-file-input type="file" v-model="file" accept="image/*" lable="upload Image" prepend-icon="mdi-camera"></v-file-input>

          <v-btn text block dark class="black" v-on:click="postEvent()"> Add Kids Camp</v-btn>
    </v-form>

        </v-flex>
      </v-layout>
</v-card>
    </v-container>
</template>
<script>
import fb from '@/fb'

export default {

  data(){
    return{
      menu: false,
      menu1:false,
      date: "",
      date1: "",
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
      id: "",
      ageGroup: "",
      types: ["youth", "kids"],
      type: ""
    }
  },
  methods:{
    postEvent: function()
    {


    fb.storage.ref(this.file.name).put(this.file).then((snapshot)=>
    {
        snapshot.ref.getDownloadURL().then((url)=>{
          this.picture = url;
          if(this.type == "kids"){
            this.about = {
                title: this.title,
                description: this.description,
                date: this.date,
                enddate: this.date1,
                time: "08:30",
                endTime: "16:30",
                image: this.picture,
                catagory: "kidsCamp",
                isFull: false,
                ageGroup: this.ageGroup,
                type: this.type
                }
          }
          if(this.type=="youth"){
            this.about = {
                title: this.title,
                description: this.description,
                date: this.date,
                enddate: this.date1,
                time: "08:00",
                endTime: "16:30",
                image: this.picture,
                catagory: "kidsCamp",
                isFull: false,
                ageGroup: this.ageGroup,
                type: this.type
                }
          }
              console.log(this.about);
              fb.db.collection("kidsCamp").add(this.about).then(() =>
              {
                  fb.db.collection("kidsCamp").where("title", "==", this.title).get().then((snapshot) => { //gets id for upcoming events
                    snapshot.docs.forEach((doc) => {
                      this.id = doc.id;
                    })
                  }).then(() => {
                    fb.db.collection('upcomingEvent').doc(this.id).set(this.about).then(() => {
                      this.success = true;
                    })
                  })
                })

        })
      })

    }

  },
}

</script>
