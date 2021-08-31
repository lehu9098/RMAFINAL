<template>
  <v-layout justify-center>
    <v-flex xs12 sm12 md9>
      <v-card flat tile outlined class="ma-4 pa-4 text-center">
            <h1 style="text-align:center">My Subscriptions</h1>
            <v-checkbox type="checkbox" :label="'Suscribe to Email list'" v-model="allEmails" v-on:mouseup="disableOthers(allEmails)"></v-checkbox>
            <v-checkbox type="checkbox" :label="'Suscribe to Fish Alongs Email list'" v-model="fishAlongs" v-show="show" v-on:mouseup="disableAll(allEmails)"></v-checkbox>
            <v-checkbox type="checkbox" :label="'Suscribe to Bugs and Brews Email list'" v-model="bugsandBrews" v-show="show" v-on:mouseup="disableAll(allEmails)"></v-checkbox>
            <v-checkbox type="checkbox" :label="'Suscribe to Shop Promotions Email list'" v-model="shopPromotions" v-show="show" v-on:mouseup="disableAll(allEmails)"></v-checkbox>
            <v-btn class="transparent grey darken-1 lighten-1 white--text" block v-on:click="updateSubsription()"> Update Subscription Preference</v-btn>
      </v-card>
  </v-flex>
  </v-layout>
</template>
<script>
import fb from '@/fb'
export default
{
  data(){
    return{
      allEmails: false,
      fishAlongs: false,
      bugsandBrews: false,
      shopPromotions: false,
      show: true,
      id: ""
    }
  },
  methods:
  {
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
    disableAll(allEmails)
    {
      if(allEmails == true)
      {
        this.allEmails = false;
      }
    },
    updateSubsription(){
      fb.db.collection('users').doc(this.id).set({fishAlongs: this.fishAlongs, shopPromotions: this.shopPromotions, bugsandBrews: this.bugsandBrews, allEmails: this.allEmails}, {merge: true}).then(() => {
        window.location.reload();
      })
    }
  },
  created(){
    fb.auth.onAuthStateChanged(user => {
      var ID = fb.auth.currentUser.uid;

      if(user)
      {
        fb.db.collection('users').doc(ID).get().then((result) =>
        {
          this.allEmails = result.data().allEmails;
          this.bugsandBrews = result.data().bugsandBrews;
          this.shopPromotions = result.data().shopPromotions;
          this.fishAlongs = result.data().fishAlongs;
          this.id = ID;
        });
      }
    });
  }
}
</script>
