<template>
  <div>
  <v-form>
    <v-select :items="name" label="select a employee" v-model='selected'></v-select>
    <v-file-input type="file" v-model="file" accept="image/*" lable="upload Image" prepend-icon="mdi-camera"></v-file-input>
    <v-btn class="black white--text" v-on:click="AddEmployeePhoto(selected)" text block> Add Employee Photo</v-btn>
  </v-form>
</div>
</template>
<script>
import fb from '@/fb'
export default{
  data()
  {
    return{
      file: null,
      picture : null,
      employee: [],
      name: [],
      selected: '',
      id: ''
    }
  },
  methods:
  {
    AddEmployeePhoto: function(selected)
    {
      var item;
      fb.storage.ref(this.file.name).put(this.file).then((snapshot) => {


      for(item of this.employee)
      {
        if(item.name == selected)
        {
          this.id = item.id;
        }
      }
          snapshot.ref.getDownloadURL().then((url)=> {
            this.picture = url;

            //its getting into the loop but not able to upload the employee image url
            fb.auth.currentUser.updateProfile({
              photoURL: this.picture
            });

            fb.db.collection('users').doc(this.id).set({photoID: url},{merge: true});
          })
          })
      }


},
  created()
  {
    var data = [];
    var names = [];
    fb.db.collection('users').where("employeeStatus", "==", true).get().then(function(querySnapshot)
  {
    querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data())
            data.push({
              name: doc.data().fullName,
              id: doc.id
            })
            names.push(
              doc.data().fullName
            )


        });

    }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    this.employee = data;
    this.name = names;
    console.log(this.employee)

  }
}
</script>
