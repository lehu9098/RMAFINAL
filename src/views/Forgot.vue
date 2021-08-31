<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs8 sm8 md8>
        <v-alert v-show="shower" type="warning">{{error}}</v-alert>
        <v-alert v-show="showSuccess" type="success">You were successfully sent a password reset email!</v-alert>
        <v-card outlined>
          <v-form class="pa-2 grey darken-1 lighten-1 white--text text-center" ref="form">
          <h2 style="text-align:center">Reset Password</h2>
          <v-text-field placeholder="Enter Email" v-model="email" background-color="white" outlined></v-text-field>
          <v-btn block text @click="reset" color="white"> Send Reset Password Link </v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import fb from "@/fb"
export default{
  data(){
    return{
      email: "",
      error: "",
      shower: false,
      showSuccess: false
    }
  },
  methods:
  {
    reset: function()
    {
        let error1;
        fb.auth.sendPasswordResetEmail(this.email).then(function()
        {
          }).catch(function(error) {
              error1 = error.message;
          }).then(() => {
            if(error1 != null)
            {
              this.error  = error1;
              this.shower = true;
            }
            else{
              this.showSuccess = true;
              this.shower = false;
            }
          })


    }
  }
}

</script>
