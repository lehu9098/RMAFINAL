<template>
  <div class="Account">
    <v-container>
      <v-layout row wrap justify-center>
      <v-flex xs12 sm8 md6>
      <v-card outlined class="mx-2" raised>
      <v-simple-table>
          <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Account Fields</th>
            <th class="text-left">Account Information</th>
            <th class="text-left">Edit Information</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{{displayName}}</td>
            <td>
              <v-btn  @click.stop="dialog1 = true" text><v-icon>edit</v-icon></v-btn>
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{email}}</td>
            <td>

            </td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{{phoneNumber}}</td>
            <td>
              <v-btn  @click.stop="dialog3 = true" text><v-icon>edit</v-icon></v-btn>
            </td>
          </tr>
          <!--<tr>
            <td>Admin</td>
            <td>{{admin}}</td>
          </tr>
          <tr>
            <td>Verified</td>
            <td>{{verified}}</td>
          </tr>-->
        </tbody>
        <v-dialog width="500" v-model="dialog3">
        <v-card class="pa-6">
          <v-text-field v-on:keyup="format" label="Enter Phone Number" v-model="phoneN" :rules="phoneRules"></v-text-field>
          <v-btn text block v-on:click="updatePhone()"> Update Phone Number </v-btn>
        </v-card>
        </v-dialog>

      <v-dialog width="500" v-model="dialog1">
      <v-card class="pa-6">
        <v-text-field label="Enter First Name" v-model="fName"></v-text-field>
        <v-text-field label="Enter Last Name" v-model="lName"></v-text-field>
        <v-btn text block v-on:click="updateName()"> Update Name </v-btn>
      </v-card>
    </v-dialog>
      </template>
      </v-simple-table>
      <!--<v-btn text block>Update Information</v-btn>-->
    </v-card>
    </v-flex>
    <v-flex xs12 sm8 md6>
        <v-alert type="success" v-if="resetSuccess">You successfully updated your password logout and logback in to confirm</v-alert>
        <v-card class="pa-6 mx-2" v-if="!resetSuccess" raised>
          <v-alert type="success" v-if="success"> You successfully reset your password </v-alert>
          <v-alert type="error" v-if="error"> {{message}}</v-alert>
          <v-card-title>Change/Reset Password</v-card-title>
          <v-form ref="form">
            <v-text-field label="Enter Old Password" v-model="passwordR" type="password" :rules="passwordRules"></v-text-field>
            <v-text-field label="Enter New Password" v-model="pass" type="password" :rules="passwordRules"></v-text-field>
            <v-text-field label="Re-Enter New Password" v-model="passRe" type="password" :rules="passwordValidation"></v-text-field>
            <v-btn block text v-on:click="reset(passwordR)">Reset Password</v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>



  </div>



</template>
<script>
import fb from '@/fb'
export default
{
  data()
  {
    return{
        displayName: "",
        resetSuccess: false,
        fName: "",
        lName: "",
        uName: "",
        pWord: "",
        passwordR: "",
        emailChange: "",
        success: false,
        error: false,
        message: "",
        email: "",
        phoneNumber: "",
        admin: "",
        verified: "",
        pass: "",
        passRe: "",
        prevPass: "",
        oldPassword: "",
        dialog3: false,
        dialog2: false,
        dialog1: false,
        phoneN: '',
        shower: false,
        phoneRules:
        [
          v => !!v || 'phone is required',
          v => v.length == 12 || "Phone must be valid",
        ],
        passwordRules:[
            v => !!v || 'password is required',
            v => v.length >= 7 || 'Password must be at least 7 characters'
          ],
          passwordValidation:
          [
            v => !!v || 'password is required',
            v => v == this.pass || 'passwords must match'
          ]


    }
  },

  methods:
  {
    format: function()
    {
      if(this.phoneN.length == 3)
      {
        this.phoneN = this.phoneN + '-';
      }
      if(this.phoneN.length == 7)
      {
        this.phoneN = this.phoneN + '-';
      }
    },
    updatePhone: function()
    {
      fb.auth.onAuthStateChanged(user =>
      {

          fb.db.collection('users').doc(user.uid).set({phoneNumber: this.phoneN}, {merge: true}).then(() => {
            this.phoneNumber = this.phoneN;
            this.dialog3 = false;
          })
      })
    },
    updateName: function()
    {
      fb.auth.onAuthStateChanged(user =>
      {
          var name = this.fName + " " + this.lName;
          fb.db.collection('users').doc(user.uid).set({fullName: name}, {merge: true}).then(() => {
            this.displayName = name;
            this.dialog1 = false;
          })
      })
    },
    reset: function(password)
    {
      const firebase = require('firebase');
      var user = fb.auth.currentUser;

      const cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
      user.reauthenticateWithCredential(cred).then( () => {
          if(this.pass == this.passRe)
          {
            var user = fb.auth.currentUser;
            user.updatePassword(this.pass).then(function() {
              console.log("Updated Password!!!")

            }).catch(function(error) {
                console.log(error.message);
              //alert("This operation is sensitive and requires recent authentication. Log in again before retrying this request.")
            })
            this.resetSuccess = true;


          }
        else {
          this.error = true;
          this.message = "The passwords do not match";
        }
      });

    }
  },
  created(){
    fb.auth.onAuthStateChanged(user => {
      //console.log(fb.auth.currentUser);
      if(user)
      {

        user.getIdTokenResult().then(idTokenResult => {
          user.admin = idTokenResult.claims.admin; //if user has admin property set it to true
          if(user.admin == true)
          {

            fb.db.collection('users').doc(user.uid).get().then((snapshot) =>
          {
              //console.log(snapshot);

              this.phoneNumber = snapshot.data().phoneNumber;
              this.displayName = snapshot.data().fullName;
              this.email = user.email;
              this.admin = user.admin;
              this.verified = user.emailVerified;


          })
          }
          else {
            fb.db.collection('users').doc(user.uid).get().then((snapshot) =>
          {
              //console.log(user.email);
              if(snapshot.data().phoneNumber === "undefined" || snapshot.data().fullName === null)
              {
                this.phoneNumber = "";
                this.displayName = "";
                this.admin = false
                this.email = user.email;
                this.verified = user.emailVerified;
                this.password = user.password;
              }
              else
                {
                  this.phoneNumber = snapshot.data().phoneNumber;
                  this.displayName = snapshot.data().fullName;
                  this.admin = false
                  this.email = user.email;
                  this.verified = user.emailVerified;
                  this.password = user.password;
                }


          })

          }





        })
      }

  })


  //fb.db.collection('users').get().then()
}




}

</script>
