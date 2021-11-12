<template>
  <v-container>
      <v-layout row justify-center>
        <v-flex xs12 sm8 md8>
          <v-alert type="success" v-if="success"> You successfully updated {{River}} River Report  <v-btn text v-on:click="success=false"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
          <v-card class="ma-4" raised>
            <v-form class="pa-4" outlined ref="form">
              <v-select v-model="River" label="Enter River Name" :items="items1" outlined @input="getData()"> <!-- Holds the data in select because you can only choose one-->
              </v-select>
              <v-text-field id="Author" v-model.lazy="Author" outlined placeholder="Enter Authors Name Here"></v-text-field>
              <v-textarea id="Report" v-model="Report" outlined placeholder="Enter Report Here"></v-textarea>
              <v-textarea id="Flies" v-model="Flies" outlined placeholder="Enter Flies Here"></v-textarea>
              <v-btn block dark class="blue-grey darken-3" v-on:click="update"> Update Report </v-btn>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>

</v-container>
</template>
<script>
import fb from '@/fb'
export default
{
  data()
  {
    return{
      on: false,
      success: false,
      items: [
      {name:'Boulder Creek', id: 1},
      {name:'South Boulder Creek', id: 2},
      {name:'Big Thompson', id: 3},
      {name:'St. Vrain', id: 4}
    ],
    Author: "",
    Report: "",
    River: "",
    Flies: "",
    items1: ['Boulder Creek', 'South Boulder Creek', 'Big Thompson', 'St. Vrain', 'South Platte', 'Blue River', 'Colorado River', 'Eagle River', 'Arkansas River', 'RMNP', 'Clear Creek'],
    riverID: [],
    outputted: ""


    }
  },
  methods:
  {
    getData(){
      if(this.River == "St. Vrain")
      {
        fb.db.collection('RiverReports').doc(this.riverID[0]).get().then((snapshot)=>
        {
            this.Author = snapshot.data().Author;
            this.Report = snapshot.data().Report;
            this.Flies = snapshot.data().Flies;
        })
      }
      if(this.River == "South Boulder Creek")
      {
        fb.db.collection('RiverReports').doc(this.riverID[1]).get().then((snapshot)=>
        {
            this.Author = snapshot.data().Author;
            this.Report = snapshot.data().Report;
            this.Flies = snapshot.data().Flies;
        })
      }
      if(this.River == "Boulder Creek")
      {
        fb.db.collection('RiverReports').doc(this.riverID[2]).get().then((snapshot)=>
        {
            this.Author = snapshot.data().Author;
            this.Report = snapshot.data().Report;
            this.Flies = snapshot.data().Flies;
        })
      }
      if(this.River == "Big Thompson")
      {
        fb.db.collection('RiverReports').doc(this.riverID[3]).get().then((snapshot)=>
        {
            this.Author = snapshot.data().Author;
            this.Report = snapshot.data().Report;
            this.Flies = snapshot.data().Flies;
        })
      }
      if(this.River == "South Platte")
      {
        fb.db.collection('RiverReports').doc(this.riverID[4]).get().then((snapshot)=>
        {
            this.Author = snapshot.data().Author;
            this.Report = snapshot.data().Report;
            this.Flies = snapshot.data().Flies;
        })
      }
      if(this.River == "Blue River")
      {
        fb.db.collection('RiverReports').doc(this.riverID[5]).get().then((snapshot)=>
        {
            this.Author = snapshot.data().Author;
            this.Report = snapshot.data().Report;
            this.Flies = snapshot.data().Flies;
        })
      }
      if(this.River == "Colorado River")
      {
        fb.db.collection('RiverReports').doc(this.riverID[6]).get().then((snapshot)=>
        {
            this.Author = snapshot.data().Author;
            this.Report = snapshot.data().Report;
            this.Flies = snapshot.data().Flies;
        })
      }
      if(this.River == "Eagle River")
      {
        fb.db.collection('RiverReports').doc(this.riverID[7]).get().then((snapshot)=>
        {
            this.Author = snapshot.data().Author;
            this.Report = snapshot.data().Report;
            this.Flies = snapshot.data().Flies;
        })
      }
      if(this.River == "Arkansas River")
      {
        fb.db.collection('RiverReports').doc(this.riverID[8]).get().then((snapshot)=>
        {
            this.Author = snapshot.data().Author;
            this.Report = snapshot.data().Report;
            this.Flies = snapshot.data().Flies;
        })
      }
      if(this.River == "RMNP")
      {
        fb.db.collection('RiverReports').doc(this.riverID[9]).get().then((snapshot)=>
        {
            this.Author = snapshot.data().Author;
            this.Report = snapshot.data().Report;
            this.Flies = snapshot.data().Flies;
        })
      }
      if(this.River == "Clear Creek")
      {
        fb.db.collection('RiverReports').doc(this.riverID[10]).get().then((snapshot)=>
        {
            this.Author = snapshot.data().Author;
            this.Report = snapshot.data().Report;
            this.Flies = snapshot.data().Flies;
        })
      }
    },
    update: function()
    {
      const date = new Date();
      const month = ["January", "February", "March", "April", "May",  "June", "July", "August", "September", "October", "November", "December"];
      const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      const dateFormatted = week[date.getDay()] + ", " + month[date.getMonth()] + " " + date.getDate();


      if(this.River == "St. Vrain")
      {
        fb.db.collection('RiverReports').doc(this.riverID[0]).update({Author: this.Author, Report: this.Report, Flies: this.Flies, date: dateFormatted} ).then(()=>
        {
          console.log("Updated DB");
          this.success = true;
          //console.log(this.Flies)
        })
        this.$refs.form.reset();
      }
      if(this.River == "South Boulder Creek")
      {
        fb.db.collection('RiverReports').doc(this.riverID[1]).update({Author: this.Author, Report: this.Report, Flies: this.Flies, date: dateFormatted}  ).then(()=>
        {
          console.log("Updated DB");
          this.success = true;
        })
        this.$refs.form.reset();
      }
      if(this.River == "Boulder Creek")
      {
        fb.db.collection('RiverReports').doc(this.riverID[2]).update({Author: this.Author, Report: this.Report, Flies: this.Flies, date: dateFormatted} ).then(()=>
        {
          console.log("Updated DB");
          this.success = true;
        })
        this.$refs.form.reset();
      }
      if(this.River == "Big Thompson")
      {
        fb.db.collection('RiverReports').doc(this.riverID[3]).update({Author: this.Author, Report: this.Report, Flies: this.Flies, date: dateFormatted}  ).then(()=>
        {
          console.log("Updated DB");
          this.success = true;
        })
        this.$refs.form.reset();
      }
      if(this.River == "South Platte")
      {
        fb.db.collection('RiverReports').doc(this.riverID[4]).update({Author: this.Author, Report: this.Report, Flies: this.Flies, date: dateFormatted} ).then(()=>
        {
          console.log("Updated DB");
          this.success = true;
        })
        this.$refs.form.reset();
      }
      if(this.River == "Blue River")
      {
        fb.db.collection('RiverReports').doc(this.riverID[5]).update({Author: this.Author, Report: this.Report, Flies: this.Flies, date: dateFormatted} ).then(()=>
        {
          console.log("Updated DB");
          this.success = true;
        })
        this.$refs.form.reset();
      }
      if(this.River == "Colorado River")
        {
          fb.db.collection('RiverReports').doc(this.riverID[6]).update({Author: this.Author, Report: this.Report, Flies: this.Flies, date: dateFormatted} ).then(()=>
          {
            console.log("Updated DB");
            this.success = true;
          })
          this.$refs.form.reset();
        }
        if(this.River == "Eagle River")
          {
            fb.db.collection('RiverReports').doc(this.riverID[7]).update({Author: this.Author, Report: this.Report, Flies: this.Flies, date: dateFormatted} ).then(()=>
            {
              console.log("Updated DB");
              this.success = true;
            })
            this.$refs.form.reset();
          }
          if(this.River == "Arkansas River")
            {
              fb.db.collection('RiverReports').doc(this.riverID[8]).update({Author: this.Author, Report: this.Report, Flies: this.Flies, date: dateFormatted} ).then(()=>
              {
                console.log("Updated DB");
                this.success = true;
              })
              this.$refs.form.reset();
            }
            if(this.River == "RMNP")
              {
                fb.db.collection('RiverReports').doc(this.riverID[9]).update({Author: this.Author, Report: this.Report, Flies: this.Flies, date: dateFormatted} ).then(()=>
                {
                  console.log("Updated DB");
                  this.success = true;
                })
                this.$refs.form.reset();
              }
              if(this.River == "Clear Creek")
                {
                  fb.db.collection('RiverReports').doc(this.riverID[10]).update({Author: this.Author, Report: this.Report, Flies: this.Flies, date: dateFormatted} ).then(()=>
                  {
                    console.log("Updated DB");
                    this.success = true;
                  })
                  this.$refs.form.reset();
                }
    }
  },
  created()
  {
    fb.db.collection('RiverReports').get().then((snapshot) =>
    {
          this.riverID = [snapshot.docs[0].id, snapshot.docs[1].id, snapshot.docs[2].id, snapshot.docs[3].id, snapshot.docs[4].id, snapshot.docs[5].id,
          snapshot.docs[6].id,  snapshot.docs[7].id, snapshot.docs[8].id, snapshot.docs[9].id, snapshot.docs[10].id]
          //console.log(this.riverID)

      })

    }
}
</script>
<style scoped>
.flies
{
  width: 250px;
}
.size
{
  width: 75px;
}
</style>
