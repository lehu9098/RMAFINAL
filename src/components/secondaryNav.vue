<template>
<v-app-bar class="blue-grey darken-3 d-none d-sm-flex d-flex" height="50%" >

    <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text v-show="showAdd">
            <span class="text-lowercase white--text" text> ADD </span>
          </v-btn>
          </template>
          <v-list>
          <v-list-item v-for="(item, index) in addLinks" :key="index" v-on="on">
            <v-btn route :to="item.src" text>{{ item.title }}</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
     <v-btn v-show="show" v-for="link in links" :key="link.id" text route :to="link.src">
       <span class="text-lowercase white--text" >{{link.title}}</span>
     </v-btn>
     <v-spacer></v-spacer>
     <v-btn text v-if="show" route :to="'/'" >
       <span class="text-lowercase white--text" v-on:click="logout" > Log Out </span>
     </v-btn>
     <v-btn v-if="showLogin" @click.stop="dialog = true" text class="self-align-end">
       <span class="text-lowercase white--text"> Login </span>
     </v-btn>
       <v-dialog width="500" v-model="dialog">
       <v-card>
           <v-card-title class="headline grey lighten-2" primary-title >
             Log In
           </v-card-title>
           <v-form class="pa-2" ref="form">
           <v-text-field placeholder="Enter Email" v-model="email"></v-text-field>
           <v-text-field placeholder="Enter Password" v-model="password" type="password"></v-text-field>
           <v-btn @click="login" to="/"> LogIn </v-btn>
           <p> Dont have a account? <v-btn class="font-weight-light" route to="/SignUp" text @click="dialog=false">Sign Up Here</v-btn></p>
           <p class="red--text lighten-2">{{error}}</p>
           </v-form>
         </v-card>
       </v-dialog>
   </v-app-bar>


</template>
<script>
import fb from "@/fb"
export default
{
  data() {
    return{
      on: false,
      show: false,
      showAdd: false,
      drawer: false,
      showLogin: true,
      dialog: false,
      email: "",
      password:"",
      error: "",
      addLinks: [],
      linked:
      [
        {icon: 'dashboard', text: 'dashboard', route: '/'}
      ],
      links:[]
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
      this.showAdd = false;
      console.log("user signed out");
    }).then(() => {
      this.show = false;
    })
    this.show = false;
    this.dialog = false;
    this.showAdd = false;
    this.showLogin= true;

  },
  login()
  {

    fb.auth.signInWithEmailAndPassword(this.email, this.password).then(cred =>{
      if(cred.user && cred.user.emailVerified == true)
      {
          this.dialog = false;
          this.$refs.form.reset();
          this.showLogin = false;
      }
      else
      {
        this.error = "You have not verified your Email"
      }
    }).catch(err =>
    {
      err = "Your Username or Password Doesnt match any records"
      this.error = err

    })
  }
  },

  created()
  {

    fb.auth.onAuthStateChanged(user => {
      if(user && user.emailVerified == true)
      {
        user.getIdTokenResult().then(idTokenResult => {
          if(idTokenResult.claims.admin == true)
          {
            this.showAdd = true;
            this.links = [
             {id: 6, title: 'My Account', src: '/Account'},
             {id: 7, title: 'Update River Report', src: '/UpdateRR'},
             {id: 8, title: 'Event Portal', src: '/EventPortal'},
             {id:9, title: "Email Blast", src:'/Email'},
           ]
           this.addLinks = [{id: 1, title: 'Add Kids Camp', src: '/AddKidsCamp'},
           {id: 2, title: 'Add Event', src: '/AddEvent'},
           {id: 3, title: 'Add Class', src: '/addClass'},
           {id: 4, title: 'Add Employee', src:'/AddEmployee'},
           {id: 5, title: 'Add Blog', src: '/AddBlog'}]
          }
        else
        {
            this.showAdd = false;
            this.links =
            [
              {id:1, title: 'My Account', src:'/Account'},
              {id:2, title: 'My Events/Classes', src:'/MyEvents'},
              {id:3, title: 'Manage Subscriptions', src:'/MySubscriptions'},
            ]
          }
      })
      this.show = true;
    }
})
},
beforeUpdate()
{
  fb.auth.onAuthStateChanged(user => {
    if(user)
    {
      this.show = true;
      this.showLogin = false;
    }
    else
    {
      this.show = false
      this.showLogin = true;
      //console.log("Heyyo-buddy")
    }
})
}

}

</script>
<style scoped>
.v-navigation-drawer {
    z-index: 5;
    margin-top: 108px;
}
</style>
