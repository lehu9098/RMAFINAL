<template>
    <v-layout justify-center class="mt-4">
      <v-flex xs12 sm8 md6>
        <v-alert type="success" v-if="show">Email Blast has succesfully been sent!<v-btn text v-on:click="show = false"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
        <v-card class="pa-3">
          <v-form ref="form">
            <v-text-field outlined class="mx-5 mt-2" v-model="EmailInfo.Subject" label="Enter Email Subject Here"></v-text-field>
            <v-text-field outlined class="mx-5 mt-2" v-model="EmailInfo.title" label="Enter Email Title Here"></v-text-field>
            <v-textarea outlined class="mx-5 mt-1" v-model="EmailInfo.body" label="Enter Email Body Here"></v-textarea>
            <v-checkbox type="checkbox" :label="'Send to Fish Alongs Email list subscribers'" v-model="fishAlongs"></v-checkbox>
            <v-checkbox type="checkbox" :label="'Send to Bugs and Brews Email list subscribers'" v-model="bugsandBrews"></v-checkbox>
            <v-checkbox type="checkbox" :label="'Send to Shop Promotions Email list subscribers'" v-model="shopPromotions"></v-checkbox>
            <v-btn class="black" block dark v-on:click="getEmails">Send Email</v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import fb from "@/fb"
export default
{
  data() {
    return{
      EmailInfo: {title: "", body: "", imageURL:"", Subject:""},
      emails : [],
      allEmails: true,
      fishAlongs: false,
      bugsandBrews: false,
      shopPromotions: false,
      show: false

    }
  },
  created(){
      this.getInitialEmails();

  },
  methods:
  {


    send(){
      //before we send we have to build a array of emails to send to based off checked boxes
        //console.log(this.emails);
        const massMail = fb.functions.httpsCallable('sendMass');
          massMail({emails: this.emails, info: this.EmailInfo}).then((result) => {
            console.log(result);
            this.show = true;
            this.$refs.form.reset();
          });


  },
  getInitialEmails(){
    fb.db.collection('emailSubscribers').get().then((snapshot) =>
      {
        snapshot.docs.forEach((doc) =>{
          this.emails.push(doc.data().email);

        })
    })
    fb.db.collection('users').where("allEmails", "==", true).get().then((querySnapshot) =>
      {
        querySnapshot.docs.forEach((doc) =>{
            this.emails.push(doc.data().email);

          })
      })
  },
  getEmails()
  {
      //Email will always send to those subscribed to all emails

    if(this.fishAlongs == true)
    {
      fb.db.collection('users').where( "fishAlongs" ,"==", true).get().then((querySnapshot) =>
      {
        querySnapshot.docs.forEach((doc) =>{
          this.emails.push(doc.data().email);
        })
      })
      this.send();
    }
    if(this.bugsandBrews == true)
    {
      fb.db.collection('users').where( "bugsandBrews" ,"==", true).get().then((querySnapshot) =>
      {
        querySnapshot.docs.forEach((doc) =>{
          this.emails.push(doc.data().email);
        })
      })
      this.send()
    }
    if(this.shopPromotions == true)
    {
      fb.db.collection('users').where( "shopPromotions" ,"==", true).get().then((querySnapshot) =>
      {

        querySnapshot.docs.forEach((doc) =>{
          this.emails.push(doc.data().email);
        })
      })
      this.send();
    }
    else if(this.fishAlongs != true && this.bugsandBrews != true && this.shopPromotions != true){
      this.send();
    }

  }
}}
</script>
