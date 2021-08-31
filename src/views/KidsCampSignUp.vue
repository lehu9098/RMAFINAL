<template>
  <v-container>
    <v-alert type="success" v-if="success"> Thanks for your intrest in Rocky Mountain Anglers Kids Camp. A member of our staff will contact you soon.</v-alert>
    <v-card class="mx-12 pa-4" v-show="show" flat>
      <v-form>
        <h1 style="text-align:center;">Kids Camp Inquiry Form</h1>
        <p>
          In order to reserve your kids place in Rocky Mountain Anglers Kids Camp submit this form and the RMA Staff will get back to you with more information
        </p>
        <h4 class="ma-1">Enter Parent or Guardian Information </h4>
        <v-text-field outlined label="Enter Parent Full Name" v-model="parentName"></v-text-field>
        <v-text-field outlined label="Enter Parent Email" v-model="parentEmail"></v-text-field>
        <v-text-field outlined label="Enter Parent Phone Number" v-model="parentPhone"></v-text-field>
        <!--<p>{{id}}</p>-->
        <h4 class="ma-1">Enter Your Childs Information</h4>
        <v-text-field outlined label="Enter Childs Full Name" v-model="childName"></v-text-field>
        <v-text-field outlined label="Enter Child Age" v-model="childAge"></v-text-field>
        <v-text-field outlined label="Enter Child Gender" v-model="gender"></v-text-field>
        <v-text-field outlined label="Has your Child Attended Kids Camp Before" v-model="history"></v-text-field>
        <v-textarea outlined label="Enter Any Health Conditions We Should Know About (Alergies, Medications, ect...)" v-model="healthConditions"></v-textarea>
        <v-btn text block class="grey lighten-2" v-on:click="SignUp()"> Inquire </v-btn>
      </v-form>
    </v-card>
  </v-container>


</template>
<script>
import fb from "@/fb"
export default{
  data(){
    return{
      id: this.$route.params.id,
      date: this.$route.params.date,
      time: this.$route.params.time,
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      childName: "",
      childAge: "",
      healthConditions: "",
      show: true,
      success: false,
      gender: "",
      history: "",
    }
  },
  methods:{
    SignUp: function()
    {
      /*const camperInfo = {
        parentName: this.parentName,
        parentEmail: this.parentEmail,
        parentPhone: this.parentPhone,
        childName: this.childName,
        childAge: this.childAge,
        healthConditions: this.healthConditions,
        gender: this.gender,
        history: this.history
      }*/


        //Send RMA Email with the participants info
        const sendKidsCampInquiry = fb.functions.httpsCallable('sendKidsCampInquiry');
        sendKidsCampInquiry({parentName: this.parentName, parentEmail: this.parentEmail, parentPhone: this.parentPhone, childName: this.childName, childAge: this.childAge, healthConditions: this.healthConditions, gender: this.gender, history: this.history}).then((result) => {
          console.log(result);
          this.show = false;
          this.success = true;
        });

    }
  }
}
</script>
