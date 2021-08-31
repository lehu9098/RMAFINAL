<template>
  <div class="mt-12">
    <v-layout justify-center>
      <v-flex xs6 sm6 md6>
      <v-alert type="success" v-if="show"> You successfully confirmed your email! Return to the home page to sign in!</v-alert>
      <v-alert type="warning" v-if="showError"> {{error}}</v-alert>
      <v-alert type="success" v-if="showReset"> You successfully reset your password return home and sign in!</v-alert>
      <v-btn tile route to="/" height="50px;" v-if="show">Return home to sign in</v-btn>
      <v-card v-show="showResetForm">
        <v-form class="pa-4">
            <v-text-field label="Enter New Password" v-model="pass" type="password" :rules="passwordRules"></v-text-field>
            <v-text-field label="Re-Enter New Password" v-model="passRe" type="password" :rules="passwordValidation"></v-text-field>
            <v-btn block text @click="handleResetPassword(pass)">Reset Password</v-btn>
        </v-form>
      </v-card>
    </v-flex>
    </v-layout>
  </div>
</template>
<script src="https://www.gstatic.com/firebasejs/7.21.0/firebase.js"></script>
<script>
import fb from '@/fb'
export default{
data () {
  return {
    show: false,
    showError: false,
    showResetForm: false,
    showReturn: false,
    showReset: false,
    pass: "",
    passRe: "",
    mode: "",
    actionCode: "",
    continueUrl: "",
    lang: "",
    error: "",
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
  logout: function()
  {
    fb.auth.signOut().then(()=>
  {
    this.show = false;
    this.dialog = false;
    this.showLogin= true;
    console.log("user signed out");
  }).then(() => {
    this.show = false;
  })
  this.show = false;
  this.dialogAccount = false;
  this.showLogin= true;

},
  getParameterByName: function(name)
  {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  },
  handleVerifyEmail: function (auth, actionCode, continueUrl, lang) {
    var show1;
    auth.applyActionCode(actionCode).then((resp) => {
      this.logout();
      window.location.replace("https://rockymtanglers.com/")
    }).catch((error) => {
      if(error.message = "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.")
      this.error = 'Your verification code expired, was already used, or encountered another problem. If you already singed up, resend a verification email using the link bellow';
      this.showError = true;
    });

},
handleResetPassword: function (password) {
  var accountEmail;
  var actionCode = this.getParameterByName('oobCode');
  var continueUrl = this.getParameterByName('continueUrl');
  var lang = this.getParameterByName('lang') || 'en';
  var auth = fb.auth;
  auth.verifyPasswordResetCode(actionCode).then((email) =>{
    var accountEmail = email;
    var error1;

    auth.confirmPasswordReset(actionCode, password).then((resp) => {
      // Password reset has been confirmed and new password updated.
      this.showReset = true;
      this.showResetForm = false;
      this.showError = false;
      //window.location.replace("http://localhost:8080/")
    }).catch((error) => {
      this.showError = true;
      this.error = error.message;

    });
  }).catch((error) => {
    this.showError = true;
    this.error = error.message;

  });
}
},

created()
{


  // Get the action to complete.
  this.mode = this.getParameterByName('mode');
  // Get the one-time code from the query parameter.
  this.actionCode = this.getParameterByName('oobCode');
  // (Optional) Get the continue URL from the query parameter if available.
  this.continueUrl = this.getParameterByName('continueUrl');
  // (Optional) Get the language code if available.
  this.lang = this.getParameterByName('lang') || 'en';

  //console.log(mode, actionCode, continueUrl, lang)
  var auth = fb.auth;

  if(this.mode == 'resetPassword')
  {
    this.showResetForm = true;
    //Add forgot password to login area
    //reset password still works within your account
  }
  if(this.mode == 'verifyEmail')
  {
     this.handleVerifyEmail(auth, this.actionCode, this.continueUrl, this.lang);
  }

}
}
</script>
