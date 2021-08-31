<template>
<v-container>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm12 md6>
      <v-alert type="success" v-if="successAlert"> You successfully added a blog post. Exit this notification to reset the page<v-btn text v-on:click="resetPage()"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
      <v-card class="pa-4" tile >
        <h3 style="text-align: center;" class="pa-4">Add Blog Post</h3>
        <v-form ref="form" v-model="isFormValid">
          <!--<v-select outlined label="Author" v-model="Author"></v-select>-->
          <v-text-field outlined label="Title" v-model="title" :rules="inputRules"></v-text-field>
          <v-text-field outlined label="Author" v-model="Author" :rules="inputRules"></v-text-field>
          <v-textarea outlined v-model="post" label="Enter Post Here" :rules="inputRules"></v-textarea>
          <v-file-input type="file" v-model="file1" accept="image/*" label="Cover Image Upload" prepend-icon="mdi-camera" @change="upload(file1)" :loading="load"></v-file-input>
          <v-file-input type="file" v-model="file2" accept="image/*" label="Upload Extra Image" prepend-icon="mdi-camera" @change="upload1(file2)" :loading="load1"></v-file-input>
          <v-file-input type="file" v-model="file3" accept="image/*" label="Upload Extra Image" prepend-icon="mdi-camera" @change="upload2(file3)" :loading="load2"></v-file-input>
          <v-file-input type="file" v-model="file4" accept="image/*" label="Upload Extra Image" prepend-icon="mdi-camera" @change="upload3(file4)" :loading="load3"></v-file-input>
          <v-file-input type="file" v-model="file5" accept="image/*" label="Upload Extra Image" prepend-icon="mdi-camera" @change="upload4(file5)" :loading="load4"></v-file-input>
        </v-form>
        <v-btn text dark class="black mt-4" block @click="uploadBlog()" :disabled="!isFormValid">upload</v-btn>
      </v-card>

    </v-flex>
    <v-flex xs12 sm12 md6>
      <v-alert type="success" v-if="updateAlert"> You successfully updated a blog post. Exit this notification to reset the page<v-btn text v-on:click="resetPage()"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
      <v-card class="pa-4" tile >
        <h3 style="text-align: center;" class="pa-4">Update Blog Post</h3>
        <v-select class="pa-3" outlined :items="docsList" label="Select the Blog to Update" v-model="name" @input="getPost()"></v-select>
        <v-form ref="form" v-model="isFormValid">
          <v-text-field outlined label="Title" v-model="titleUp" :rules="inputRules"></v-text-field>
          <v-text-field outlined label="Author" v-model="AuthorUp" :rules="inputRules"></v-text-field>
          <v-textarea outlined v-model="postUp" label="Enter Post Here" :rules="inputRules"></v-textarea>
        </v-form>
        <v-btn text dark class="black mt-4" block @click="updateBlog()" :disabled="!isFormValid">update</v-btn>
      </v-card>
    </v-flex>
</v-layout>
</v-container>

</template>
<script>
import fb from '@/fb'

export default
{
  data() {
    return{
      name: "",
      docsList: [],
      titleUp: "",
      AuthorUp: "",
      postUp: "",
      blogID: "",
      updateAlert: false,
      file1: null,
      file2: null,
      file3: null,
      file4: null,
      file5: null,
      imgArray: [],
      urlArray: [],
      Author: "",
      post: "",
      load: false,
      load1: false,
      load2: false,
      load3: false,
      load4: false,
      successAlert: false,
      title: "",
      isFormValid: false,
      inputRules: [
        v => v.length >= 2 || "Minimum Length is 2 characters" //if first statement is true ignores the error message
      ],
      rules: [
      value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
    }},
    methods:
    {
      updateBlog(){
        fb.db.collection('Blogs').doc(this.blogID).set({author: this.AuthorUp, content: this.postUp , title: this.titleUp}, {merge: true}).then(() => {
          this.updateAlert= true;
        })
      },
      getPost(){
        fb.db.collection('Blogs').where("title", "==", this.name).get().then((snapshot)=>
        {
            this.AuthorUp = snapshot.docs[0].data().author;
            this.postUp = snapshot.docs[0].data().content;
            this.titleUp = snapshot.docs[0].data().title;
            this.blogID = snapshot.docs[0].id;
        })
      },
      resetPage(){
        window.location.reload();
      },
     upload(file)
      {
        this.load = true;
        fb.storage.ref(file.name).put(file).then((snapshot)=>
        {
          snapshot.ref.getDownloadURL().then((url)=>{
              this.urlArray.push(url);
              this.load = false;
            })
        })//set shower for green check/ not check
      },
      upload1(file)
       {
         this.load1 = true;
         fb.storage.ref(file.name).put(file).then((snapshot)=>
         {
           snapshot.ref.getDownloadURL().then((url)=>{
               this.urlArray.push(url);
               this.load1 = false;
             })
         })//set shower for green check/ not check
       },
       upload2(file)
        {
          this.load2 = true;
          fb.storage.ref(file.name).put(file).then((snapshot)=>
          {
            snapshot.ref.getDownloadURL().then((url)=>{
                this.urlArray.push(url);
                this.load2 = false;
              })
          })//set shower for green check/ not check
        },
        upload3(file)
         {
           this.load3 = true;
           fb.storage.ref(file.name).put(file).then((snapshot)=>
           {
             snapshot.ref.getDownloadURL().then((url)=>{
                 this.urlArray.push(url);
                 this.load3 = false;
               })
           })//set shower for green check/ not check
         },
         upload4(file)
          {
            this.load4 = true;
            fb.storage.ref(file.name).put(file).then((snapshot)=>
            {
              snapshot.ref.getDownloadURL().then((url)=>{
                  this.urlArray.push(url);
                  this.load4 = false;
                })
            })//set shower for green check/ not check
          },
      uploadBlog: function()
      {
        this.isFormValid = false;
        const date = new Date();
        const month = ["January", "February", "March", "April", "May",  "June", "July", "August", "September", "October", "November", "December"];
        const week = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"]
        const dateFormatted = week[date.getDay()] + ", " + month[date.getMonth()] + " " + date.getDate();
        var BlogObject = {
          content: this.post,
          author: this.Author,
          images: this.urlArray,
          title: this.title,
          date: dateFormatted,
          utc: Date.parse(date)
        }

        fb.db.collection('Blogs').doc().set(BlogObject).then(() =>
      {
        this.successAlert = true;
        setTimeout(() => {
          this.isFormValid = true;
        }, 3000);  
      })

    }
  },
    created()
    {
      fb.db.collection('Blogs').get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.docsList.push(
            doc.data().title
          )
          this.show = true;
        })
      })
    }
  }
</script>
