<v-dialog width="500" v-model="dialog">
<v-card class="pa-6">
  <v-form ref="form">
  <v-card-title>{{evt.title}} Sign Up {{evt.id}}</v-card-title>
  <v-text-field label="Enter Name" v-model="Name"></v-text-field>
  <v-text-field label="Enter Email" v-model="Email"></v-text-field>
  <v-text-field label="Enter Phone Number" v-model="phoneN"></v-text-field>
  <v-btn text @click="show = !show"> Add Plus One  <v-icon> expand_more </v-icon></v-btn>
  <v-expand-transition>
    <div v-show="show">
      <v-divider></v-divider>
      <v-text-field label="Enter Plus Ones Name"></v-text-field>
      <v-text-field label="Enter Plus Ones Email"></v-text-field>
      <v-text-field label="Enter Plus Ones Phone Number"></v-text-field>
    </div>
  </v-expand-transition>
  <v-btn text block v-on:click="addParticipant(evt.id)"> Sign Up </v-btn>
  </v-form>
