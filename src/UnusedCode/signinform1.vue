<template>
  <v-container>
          <v-form ref="form" v-if="shower" class="white pa-12">
            <h2 class="text-center"> Sign Up </h2>
            <label>Enter Your First Name</label>
            <v-text-field outlined v-model="firstN" :rules="inputRules"></v-text-field>
            <label>Enter Your Last Name</label>
            <v-text-field outlined  v-model="lastN" :rules="inputRules"></v-text-field>
            <!--<label>Enter a Username</label>
            <v-text-field outlined v-model="userN"></v-text-field>-->
            <label>Enter a Password</label>
            <v-text-field outlined v-model="Password" :rules="passwordRules"></v-text-field>
            <label>Re-enter a Password</label>
            <v-text-field outlined v-model="PasswordV" :rules="passwordValidation"></v-text-field>
            <label>Enter Your Phone Number</label>
            <v-text-field outlined v-model="phoneN" :rules="phoneRules"></v-text-field>
            <label>Enter Your Email address</label>
            <v-text-field outlined v-model="Email" :rules="emailRules"></v-text-field>
            <v-checkbox :label="'Suscribe to Email list'"></v-checkbox>
            <v-btn dark v-on:click="postUser"> Sign Up</v-btn>
          </v-form>
          <v-alert type="success" v-if="success"> You were successfully added. Go to the Login Tab to Access your account</v-alert>
  </v-container>
</template>
<script>
import fb from '@/fb'
export default
{
  data() {
    return{
      showError: false,
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
    postUser: function()
    {
      const aboutUser = {
        phoneNumber: this.phoneN,
        username: this.userN,
        fullName: this.firstN + " " + this.lastN
      }
      fb.auth.createUserWithEmailAndPassword(this.Email, this.Password).then((cred)=> {
          fb.db.collection('users').doc(cred.user.uid).set(aboutUser);
          if(cred.user)
          {
            cred.user.updateProfile({
              displayName: this.firstN + " " + this.lastN
            })
            console.log(cred.user.phoneNumber)
          }

      })
      this.$refs.form.reset(); //resets form
      this.$refs.form.resetValidation();
      this.shower = false;
      this.success = true;
    }

  }
}
</script>
