<template>
  <v-container>
          <v-form ref="form" v-if="shower" class="white pa-12" v-model="isFormValid">
            <h2 class="text-center"> Sign Up </h2>
            <label>Enter Your First Name</label>
            <v-text-field outlined v-model="firstN" :rules="inputRules"></v-text-field>
            <label>Enter Your Last Name</label>
            <v-text-field outlined  v-model="lastN" :rules="inputRules"></v-text-field>
            <!--<label>Enter a Username</label>
            <v-text-field outlined v-model="userN"></v-text-field>-->
            <label>Enter a Password</label>
            <v-text-field outlined v-model="Password" :rules="passwordRules" type="password"></v-text-field>
            <label>Re-enter a Password</label>
            <v-text-field outlined v-model="PasswordV" :rules="passwordValidation" type="password"></v-text-field>
            <label>Enter Your Phone Number</label>
            <v-text-field v-on:keyup="format" outlined v-model="phoneN" :rules="phoneRules"></v-text-field>
            <label>Enter Your Email address</label>
            <v-text-field outlined v-model="Email" :rules="emailRules"></v-text-field>
            <v-checkbox type="checkbox" :label="'Suscribe to All Emails'" v-model="allEmails" v-on:mouseup="disableOthers(allEmails)"></v-checkbox>
            <v-checkbox type="checkbox" :label="'Suscribe to Just Fish Alongs Emails'" v-model="fishAlongs" v-show="show"></v-checkbox>
            <v-checkbox type="checkbox" :label="'Suscribe to Just Bugs and Brews Emails'" v-model="bugsandBrews" v-show="show"></v-checkbox>
            <v-checkbox type="checkbox" :label="'Suscribe to Just Shop Promotions Emails'" v-model="shopPromotions" v-show="show"></v-checkbox>
            <v-btn dark v-on:click="postUser" :disabled="!isFormValid"> Sign Up</v-btn>
          </v-form>
          <v-alert type="warning" v-if="showError"> {{error}}</v-alert>
          <v-alert type="success" v-if="success"> You were successfully added. You will recieve an email verification shortly</v-alert>
  </v-container>
</template>
<script>
import fb from '@/fb'
export default
{
  data() {
    return{
      error: "",
      showError: false,
      allEmails: false,
      fishAlongs: false,
      bugsandBrews: false,
      shopPromotions: false,
      show: true,
      LoginRedirect: '',
      LoginEmail: "",
      LoginPassword: "",
      success: false,
      shower: true,
      firstN: "",
      lastN: "",
      userN: "",
      Password: "",
      PasswordV: "",
      phoneN: "",
      Email: "",
      isFormValid: false,
      inputRules: [
        v => v.length >= 2 || "Minimum Length is 2 characters" //if first statement is true ignores the error message
      ],
      emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid', //checks
        ],
      phoneRules:
      [
        v => !!v || 'phone is required',
        v => v.length == 12 || "Phone must be valid",
      ],
      passwordRules:
      [
        v => !!v || 'password is required',
        v => v.length >= 7 || 'Password must be atleast 7 characters'
      ],
      passwordValidation:
      [
        v => !!v || 'password is required',
        v => v == this.Password || 'passwords must match'
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
    disableOthers(allEmails)
    {
      if(allEmails == false) //Always off by one... when false its changed to true
      {
        this.fishAlongs = false;
        this.shopPromotions = false;
        this.bugsandBrews = false;
        this.show = false;
      }
      else
      {
        this.show = true;
      }
      //console.log()

    },
    postUser: function()
    {
      const aboutUser = {
        phoneNumber: this.phoneN,
        fullName: this.firstN + " " + this.lastN,
        allEmails: this.allEmails,
        fishAlongs: this.fishAlongs,
        bugsandBrews: this.bugsandBrews,
        shopPromotions: this.shopPromotions,
        email: this.Email
      }

      fb.auth.createUserWithEmailAndPassword(this.Email, this.Password).then((cred)=> {

            //var user = fb.auth.currentUser;
            cred.user.sendEmailVerification().then(() => {     //sends verififcation email

              //console.log(cred.user.uid)
              fb.db.collection('users').doc(cred.user.uid).set(aboutUser);
              if(cred.user)
              {
                cred.user.updateProfile({
                  displayName: this.firstN + " " + this.lastN
                })
              }
            })

            this.shower = false;
            this.success = true;
            this.showError = false;


      }).catch((error) => {
        this.error = error.message;
        this.showError = true;
      });



    }

  }
}
</script>
