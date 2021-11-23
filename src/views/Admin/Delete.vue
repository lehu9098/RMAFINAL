<template>
  <v-container>
  <v-layout row justify-center>
    <v-flex xs10 sm10 md10>
      <v-alert type="success" v-if="showSuccess"> You successfully deleted {{name}}!<v-btn text v-on:click="refresh()"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
      <v-alert type="warning" v-if="showError"> {{error}}</v-alert>
      <v-card>
        <h3 style="text-align:center;" class="pa-3">Delete Event/Class</h3>
        <v-select class="pa-3" outlined :items="eventList" label="Select a Event-Class Section" v-model="dbName" @input="getDocs()"></v-select>
        <v-select v-if="show" class="pa-3" outlined :items="docsList" label="Select the Event-Class to Delete" v-model="name"></v-select>
        <v-btn v-if="show" v-on:click="deleter()" block dark>Delete</v-btn>
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
      eventList: ["BugsandBrews", "kidsCamp", "IntroClasses", "TyingClasses",  "CreekCleanup",  "FishAlongs", "Blogs", "otherEvents", "otherClasses"],
      dbName: "",
      docsList: [],
      show: false,
      name: "",
      showError: false,
      showSuccess: false,
      error: "",
      id: "",
      emails: [],
      userids: []
    }
  },
  methods: {
    refresh(){
      window.location.reload();
    },
    getDocs(){
      this.docsList = []
      console.log(this.dbName)
      fb.db.collection(this.dbName).get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.docsList.push(
            doc.data().title + "//" + doc.data().date + "//" +  doc.id
          )
          this.show = true;
        })
      })
    },
    deleter(){
      let id = this.name.split("//"); //splits the string into pieces
      this.id = id[2];
      fb.db.collection(this.dbName).doc(this.id).get().then(() => {
        if(this.dbName != 'Blogs' && this.dbName != 'SpecialtyTrips')
        {
            fb.db.collection(this.dbName).doc(this.id).collection('participants').get().then((snapshot) =>{
              snapshot.docs.forEach((doc)=>{
                this.emails.push(doc.data().email)
                this.userids.push(doc.id)
              })
            }).then(()=>
            {
              fb.db.collection(this.dbName).doc(this.id).delete().then(() => {
                fb.db.collection('upcomingEvent').doc(this.id).delete().then(() => {
                  this.showSuccess = true;
                  this.showError = false;
                  const sendDelete = fb.functions.httpsCallable('sendDelete');
                    sendDelete({emails: this.emails, title: this.name}).then((result) => {
                      console.log(result);
                    });
                  }).then(() => {
                    this.userids.forEach((id) => {
                      fb.db.collection('users').doc(id).collection('myEvents').doc(this.id).delete().then(() => {
                        console.log("deleted in MyEvents")
                      });
                    })
                  });
                }).catch((error) => {
                  this.error = error;
                  this.showError = true;
                })
            })
          }
          if(this.dbName == 'Blogs'){
            fb.db.collection(this.dbName).doc(this.id).delete().then(() => {
                this.showSuccess = true;
                this.showError = false;
              }).catch((error) => {
                this.error = error;
                this.showError = true;
              })
          }
          if(this.dbName == "SpecialtyTrips")
          {
            fb.db.collection(this.dbName).doc(this.id).delete().then(() => {
                this.showSuccess = true;
                this.showError = false;
              }).catch((error) => {
                this.error = error;
                this.showError = true;
              })
          }
        //console.log(this.id)

      }).catch((error)=> {
        console.log(error)
        this.error = "You must select a specific document to Delete";
        this.showError = true;
      })




    }
  }
}

</script>
