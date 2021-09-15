<template>
  <div>
    <v-container>
        <v-layout row justify-center>
          <v-flex xs12 sm8 md8>
            <v-alert type="error" v-if="error"> An Error Occured when adding an Annoucement  <v-btn text v-on:click="close()"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
            <v-alert type="success" v-if="success"> You successfully updated added an Annoucement  <v-btn text v-on:click="close()"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
            <v-card class="ma-4" raised>
              <h3 style="text-align: center;" class="pa-4">Add Annoucement</h3>
              <v-form class="pa-4" outlined ref="form">
                <v-text-field id="Title" v-model="annoucnementObject.title" outlined placeholder="Enter Title Here"></v-text-field>
                <v-textarea id="Announcement" v-model="annoucnementObject.annoucement" outlined placeholder="Enter Announcement Here"></v-textarea>
                <v-slider label="Image Height" max="500" min="250" v-model="annoucnementObject.height"></v-slider>
                <v-file-input type="file" v-model="photo" accept="image/*" label="Cover Image Upload" prepend-icon="mdi-camera" @change="upload()" :loading="load"></v-file-input>
                <v-btn block dark class="blue-grey darken-3" @click="addAnnouncement()"> Add Annoucement </v-btn>
              </v-form>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12> <!--</v-flex>v-if="this.annoucnementObject.photoUrl">-->
            <v-card flat>
              <v-layout row justify-center>
                <v-flex xs7 sm7 md6>
                    <v-img ref="announcementImage" :src="annoucnementObject.photoUrl" :max-height="annoucnementObject.height" :min-height="annoucnementObject.height" style="overflow:hidden; width: auto" class="align-center" eager></v-img>
                </v-flex>
                <v-flex xs5 sm5 md6>
                  <v-card style="overflow: scroll" :height="annoucnementObject.height" scrollable flat>
                    <h2 style="border-bottom: 1px solid black;text-align:center;" class="ma-4 font-weight-light"><strong>{{annoucnementObject.title}}</strong></h2>
                    <p class="font-weight-light ma-10">
                      {{annoucnementObject.annoucement}}
                    </p>
                  </v-card>
                </v-flex>
                </v-layout>
              </v-card>
          </v-flex>
        </v-layout>

  </v-container>
  </div>
</template>
<script>
import fb from '@/fb'
export default {
  data()
  {
    return{
      error: false,
      errorMessage: "",
      success: false,
      photo: null,
      load: false,
      photoToDelete: "",
      annoucnementObject: {
        annoucement: "",
        title: "",
        photoUrl: "",
        ratio: null,
        height: 375,
        storageName: ""
      }
    }
  },
  methods:
  {
    addAnnouncement(){
      fb.db.collection('Announcements').doc('dXPC6NqqtFIgFRIWfNGY').set(this.annoucnementObject).then(() => {
        this.success = true;
        this.photo = null;
        fb.storage.ref(this.photoToDelete).delete();
      }).catch((error) => {
        this.error = true;
        this.errorMessage = error.message;
      });
    },
    //Upload the photo to firebase storage
    upload()
    {
      this.load = true;
      fb.storage.ref(this.photo.name).put(this.photo).then((snapshot)=>
      {
        snapshot.ref.getDownloadURL().then((url)=>{
            this.annoucnementObject.photoUrl = url;
            this.annoucnementObject.storageName = this.photo.name;
            this.load = false;
          })
      })
    },
    close()
    {
      this.success = false;
    }
  },
  created()
  {
    fb.db.collection('Announcements').doc('dXPC6NqqtFIgFRIWfNGY').get().then((snapshot) =>
    {
      this.photoToDelete = snapshot.data().storageName;
      this.annoucnementObject = snapshot.data();
    })
  }
}
</script>
