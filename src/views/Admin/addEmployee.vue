<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm8 md4>
        <v-card outlined class="pa-6">
        <v-alert type="success" v-if="success"> You successfully added an {{tempEmail}} as an employee<v-btn text v-on:click="success = false"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
        <p><b>
          To Add An Employee First the Employee Must Sign Up As a Regular User
        </b></p>
        <v-form ref="form1">
          <v-text-field label="Enter Employee Email" v-model="adminEmail"></v-text-field>
          <v-text-field label="Enter Employee Role" v-model="adminRole"></v-text-field>
          <v-textarea outlined label="Enter Employee Bio" v-model="bio"></v-textarea>
          <v-file-input type="file" v-model="file1" accept="image/*" label="Employee Image Upload" prepend-icon="mdi-camera" @change="upload(file1)" :loading="load"></v-file-input>
          <!--<v-select :items="colors" label="select a employee color" v-model="color"></v-select>-->
          <v-btn block dark v-on:click="addAdminRole">Add Employee</v-btn>
        </v-form>
        </v-card>
        </v-flex>
        <v-flex xs12 sm8 md4>
          <v-card  outlined class="pa-6">
          <v-alert type="success" v-if="success3"> You successfully Deleted {{tempEmail}}</v-alert>
          <p><b>
            Delete Employee
          </b></p>
          <v-form ref="form2">
            <v-text-field label="Enter Employee Email" v-model="adminEmailDelete"></v-text-field>
            <v-btn block dark v-on:click="deleteAdminRole">Delete Employee</v-btn>
          </v-form>
          </v-card>

        </v-flex>
        <v-flex xs12 sm8 md4>
          <v-card  outlined class="pa-6">
          <v-alert type="success" v-if="modified"> You successfully Updated {{employee}}<v-btn text v-on:click="modified = false"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
          <p><b>
            Update Employee Profile
          </b></p>
          <v-form ref="form1">
            <v-select label="Select Employee to Update" v-model="employee" :items="employees"></v-select>
            <v-text-field label="Enter Employee Role" v-model="employeeRole"></v-text-field>
            <v-textarea outlined label="Enter Employee Bio" v-model="updateBio"></v-textarea>
            <v-file-input type="file" v-model="file2" accept="image/*" label="Employee Image Upload" prepend-icon="mdi-camera" @change="upload(file2)" :loading="load"></v-file-input>
            <!--<v-select :items="colors" label="select a employee color" v-model="color"></v-select>-->
            <v-btn block dark v-on:click="updateEmployee()">Update Employee</v-btn>
          </v-form>
          </v-card>

        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import fb from '@/fb'
//import empPhoto from '../components/employeesearch.vue'
export default
{

  data()
  {
    return{
      users: [],
      adminEmail: "",
      adminEmailDelete: "",
      bio: "",
      file: null,
      picture : null,
      adminRole: "",
      colors: [],
      color: '',
      success: false,
      success3: false,
      tempEmail: "",
      file1: "",
      photoUrl: "",
      load: false,
      employees: [],
      employeeID: [],
      file2: "",
      employeeRole: "",
      updateBio: "",
      employee: "",
      modified: false
    }
  },
  methods: {
    upload(file)
     {
       this.load = true;
       fb.storage.ref(file.name).put(file).then((snapshot)=>
       {
         snapshot.ref.getDownloadURL().then((url)=>{
             this.photoUrl = url;
             this.load = false;
           })
       })//set shower for green check/ not check
     },
  addAdminRole()
  {
    //const storageRef = fb.storage.ref(this.file.name).put(this.file);
    const getuserID = fb.functions.httpsCallable('getuserID');
    const addAdminRole = fb.functions.httpsCallable('addAdminRole');
      addAdminRole({email: this.adminEmail}).then((result) => {
        console.log(result)
        var bio = this.bio;
        var position = this.adminRole;
        var empColor = this.color;
        var photo = this.photoUrl;
        getuserID({email: this.adminEmail}).then((userID) => //Change actually gets all user data
        {
          this.id = userID
          //console.log(bio)
            fb.db.collection('users').doc(this.id.data.uid).set({photoID: photo, bio: bio, position: position, employeeStatus: true, color: empColor}, {merge: true});//merge allows for us to not override data already there
        })
        }).then(() =>
      {
        this.tempEmail = this.adminEmail
        this.success = true;
      })


  },
  deleteAdminRole()
  {
    const getuserID = fb.functions.httpsCallable('getuserID');
    const deleteAdminRole = fb.functions.httpsCallable('deleteAdminRole');
      deleteAdminRole({email: this.adminEmailDelete}).then((result) => {
        getuserID({email: this.adminEmailDelete}).then((userID) => //Change actually gets all user data
        {
          this.id = userID
          console.log(result);
          //console.log(this.id.data.uid)
          fb.db.collection('users').doc(this.id.data.uid).update({bio: "", position: "", photoID: "", employeeStatus: false});//merge allows for us to not override data already there
        })
        }).then(() =>
      {
        this.tempEmail = this.adminEmailDelete
        this.success3 =true;
        this.$refs.form2.reset();
      })

  },
  updateEmployee()
  {
    var id = "";
    this.employeeID.forEach((employee) => {
      if(employee.name == this.employee){
        id = employee.id;
      }
    });

    if(this.updateBio != "")
    {
      fb.db.collection('users').doc(id).update({bio: this.updateBio}).then(() => {
        this.modified = true;
      });
    }
    if(this.employeeRole != "")
    {
      fb.db.collection('users').doc(id).update({position: this.employeeRole}).then(() => {
        this.modified = true;
      });
    }
    if(this.photoUrl != "")
    {
      fb.db.collection('users').doc(id).update({photoID: this.photoUrl}).then(() => {
        this.modified = true;
      });
    }
    /*console.log(id)
    fb.db.collection('users').doc(id).update({bio: this.updateBio, position: this.employeeRole, photoID: this.photoUrl}).then(() => {
      this.modified = true;
    });//merge allows for us to not override data already there*/

  }
},


    created()
    {



    fb.db.collection('users').where("employeeStatus", "==", true).get().then((querySnapshot) =>
    {
    querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            this.employees.push(doc.data().fullName)
            this.employeeID.push({name: doc.data().fullName, id: doc.id })

        });

    })


    }
}

</script>
