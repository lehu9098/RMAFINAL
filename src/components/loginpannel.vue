<template>
  <v-app>
    <v-dialog>
      <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="font-weight-light">
        <span class="text-uppercase" text> Login </span>
      </v-btn>
    </template>
    <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >
          LogIn
        </v-card-title>
        <v-text-field placeholder="Enter Email"></v-text-field>
        <v-text-field placeholder="Enter Password"></v-text-field>
      </v-card>
    </v-dialog>

    <v-expansion-panel class="pa-2 ma-2">
      <v-expansion-panel-header class="text-center"><b>Log In</b></v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-form>
          <label>Enter Email</label>
          <v-text-field outlined v-model="LoginEmail"></v-text-field>
          <label>Enter Password</label>
          <v-text-field outlined v-model="LoginPassword"></v-text-field>
          <v-btn v-on:click="login" route :to="LoginRedirect"> Log In </v-btn>
          <p> Don't have an account? Sign Up bellow </p>
          <p v-if="showError" class="text--red">UserName and or Password are incorrect</p>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-app>
</template>
<script>
export default
{
  data()
  {
    return{
      on: false
    }
  }
}

</script>
