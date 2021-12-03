<template>
  <div>
    <v-container>
        <v-layout row justify-center>
          <v-flex xs12 sm12 md12>
            <v-alert type="error" v-if="error"> An Error Occured when adding an Annoucement  <v-btn text v-on:click="close()"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
            <v-alert type="success" v-if="success"> You successfully added an Annoucement  <v-btn text v-on:click="close()"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
             <v-alert type="error" v-if="deleted"> You successfully deleted an Annoucement  <v-btn text v-on:click="close()"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
            <v-card class="ma-4" raised>
              <h3 style="text-align: center;" class="pa-4">Add/Update Annoucement</h3>
              <v-form class="pa-4" outlined ref="form">
                <v-text-field id="Title" v-model="announcementObject.title" outlined placeholder="Enter Title Here"></v-text-field>
                <v-textarea id="Announcement" v-model="announcementObject.announcement" outlined placeholder="Enter Announcement Here"></v-textarea>
                <v-slider label="Image Height" max="500" min="250" v-model="announcementObject.height"></v-slider>
                <v-file-input type="file" v-model="photo" accept="image/*" label="Cover Image Upload" prepend-icon="mdi-camera" @change="upload()" :loading="load"></v-file-input>
                <v-btn block dark class="blue-grey darken-3" @click="addAnnouncement()"> Add/Update Annoucement </v-btn>
              </v-form>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-card flat>
              <v-layout row justify-center>
                <v-flex xs7 sm7 md6>
                    <v-img ref="announcementImage" :src="announcementObject.photoUrl" :max-height="announcementObject.height" :min-height="announcementObject.height" style="overflow:hidden; width: auto" class="align-center" eager></v-img>
                </v-flex>
                <v-flex xs5 sm5 md6>
                  <v-card style="overflow-y: scroll" :height="announcementObject.height" scrollable flat>
                    <h2 style="border-bottom: 1px solid black;text-align:center;" class="ma-4 font-weight-light"><strong>{{announcementObject.title}}</strong></h2>
                    <p class="font-weight-light ma-10">
                      {{announcementObject.announcement}}
                    </p>
                  </v-card>
                </v-flex>
                </v-layout>
              </v-card>
          </v-flex>
          <v-flex xs6 sm6 md6 class="mt-6" v-if="announcementObject.active">
            <v-btn block dark class="red darken-3" @click="deleteButton = true" v-if="!deleteButton"> Delete Current Announcement </v-btn>
            <v-btn block dark class="red darken-3" @click="deleteAnnouncement()" v-if="deleteButton"> Confirm Delete </v-btn>
            <v-btn block dark class="grey darken-3" @click="deleteButton = false" v-if="deleteButton"> Cancel </v-btn>
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
      deleted: false,
      deleteButton: false,
      announcementObject: {
        announcement: "",
        title: "",
        photoUrl: "",
        height: 375,
        storageName: "",
        active: false,
      }
    }
  },
  methods:
  {
    addAnnouncement(){
      this.announcementObject.active = true;
      fb.db.collection('Announcements').doc('dXPC6NqqtFIgFRIWfNGY').set(this.announcementObject).then(() => {
        this.success = true;
        this.photo = null;
        fb.storage.ref(this.photoToDelete).delete();
      }).catch((error) => {
        console.log(error);
        this.error = true;
        this.errorMessage = error.message;
      });
    },
    //Upload the photo to firebase storage
    upload()
    {
      if(this.photo != null)
      {
        this.load = true;
        fb.storage.ref(this.photo.name).put(this.photo).then((snapshot)=>
        {
          snapshot.ref.getDownloadURL().then((url)=>{
              this.announcementObject.photoUrl = url;
              this.announcementObject.storageName = this.photo.name;
              this.load = false;
            })
        })
      }
    },
    deleteAnnouncement()
    {
      this.announcementObject = {
        announcement: "",
        title: "",
        photoUrl: "",
        height: 375,
        storageName: "",
        active: false,
      }
      //set everything blank and set active to false
      fb.db.collection('Announcements').doc('dXPC6NqqtFIgFRIWfNGY').set(this.announcementObject).then(() => {
        this.deleted = true;
        this.deleteButton = false;
        fb.storage.ref(this.photoToDelete).delete();
      })
    },
    close()
    {
      this.success = false;
      this.deleted = false;
      this.error = false
    }
  },
  created()
  {
    fb.db.collection('Announcements').doc('dXPC6NqqtFIgFRIWfNGY').get().then((snapshot) =>
    {
      this.photoToDelete = snapshot.data().storageName;
      this.announcementObject = snapshot.data();
    })
  }
}
</script>
