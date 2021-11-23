<template>
  <v-app-bar class="d-md-none d-sm-none white justify-space-around px-2" height="75">
        <!-- Menu Dialog with Button-->
        <v-row>
          <v-col md="12">
            <v-btn text icon @click="dialogMenu=true"><v-icon>view_headline</v-icon></v-btn>
          </v-col>
        </v-row>
        <v-dialog v-model="dialogMenu" fullscreen transition="dialog-bottom-transition">
          <v-card dark class="blue-grey darken-3" tile>
            <v-layout justify-center column>
              <v-flex>
                <v-btn @click="dialogMenu=false" block class="blue-grey darken-3" text><v-icon>close</v-icon></v-btn>
              </v-flex>
              <v-flex xs="12" sm="12" v-for="link1 in links1" :key="link1.src">
                <v-btn class="font-weight-light" block route :to="link1.src" text @click="dialogMenu = false">{{ link1.title }}</v-btn>
              </v-flex>
              <v-btn text class="font-weight-light mx-2" route to="/Calendar" exact inline-block @click="dialogMenu = false">
                <span class="text-uppercase" text><v-icon>mdi-calendar</v-icon></span>
              </v-btn>
              <v-btn text class="font-weight-light mx-2" route to="/TyingVideos" exact inline-block @click="dialogMenu = false">
                <span class="text-uppercase" text><v-icon>video_library</v-icon></span>
              </v-btn>
              <v-flex v-for="icon in icons" :key="icon.icon">
                <v-btn class="white--text blue-grey darken-3" text :href="icon.link" block>
                  <v-icon >{{ icon.icon }}</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
        </v-card>
        </v-dialog>
        <v-row>
          <v-col md="12">
            <v-img src="../Photos/Logo/RMA-logo-flat.jpg" height="75" width="125" v-on:click="reroute()"></v-img>
          </v-col>
        </v-row>
          <!-- Account Dialog with Button-->
          <v-row>
            <v-col md="12">
              <v-btn text icon @click="dialogAccount=true"><v-icon>mdi-account</v-icon></v-btn>
            </v-col>
          </v-row>
        <v-dialog v-model="dialogAccount" fullscreen transition="dialog-bottom-transition">
          <v-card dark class="blue-grey darken-3" tile>
            <v-layout justify-center column>
              <v-flex>
                <v-btn @click="dialogAccount=false" block class="blue-grey darken-3" text><v-icon>close</v-icon></v-btn>
              </v-flex>
              <v-flex>
                <v-btn v-show="showLogin" @click="dialogLogin= true" block class="blue-grey darken-3" text>Login</v-btn>
              </v-flex>
              <v-flex>
                <v-btn v-show="show"  v-for="link in links" :key="link.id" text route :to="link.src" block  @click="dialogAccount = false">
                  <span class="text-lowercase white--text" >{{link.title}}</span>
                </v-btn>
                <v-btn text v-if="show" route to="/" block class="blue-grey darken-3">
                  <span class="text-lowercase white--text" v-on:click="logout"> Log Out </span>
                </v-btn>
              </v-flex>
            </v-layout>
        </v-card>
        </v-dialog>
        <!-- Login Dialog -->
        <v-dialog width="500" v-model="dialogLogin">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title >
              Log In
            </v-card-title>
            <v-form class="pa-2" ref="form">
            <v-text-field placeholder="Enter Email" v-model="email"></v-text-field>
            <v-text-field placeholder="Enter Password" v-model="password" type="password"></v-text-field>
            <v-btn @click="login" to="/"> LogIn </v-btn>
            <p> Dont have a account? <v-btn class="font-weight-light" route to="/SignUp" text @click="dialogLogin=false; dialogAccount=false">Sign Up Here</v-btn></p>
            <p class="red--text lighten-2">{{error}}</p>
            </v-form>
          </v-card>
        </v-dialog>
  </v-app-bar>

</template>
<script>
import fb from "@/fb"
  export default{
    data(){
      return{
        dialogMenu: false,
        dialogAccount: false,
        dialogLogin: false,
        showLogin: true,
        addLinks: [],
        show: false,
        links: [],
        email: "",
        password:"",
        error: "",

        links1: [
          {id: 1, title:'Home', src:"/"},
          {id: 4, title: 'Staff', src: '/Employees'},
          {id: 5, title: 'Guided Trips', src: '/GuideTrips'},
          {id: 6, title: 'Blog', src: '/Blog'},
          {id: 7, title: 'Events', src:'/Events'},
          {id: 8, title: 'Classes', src:'/Classes'},
          {id: 9, title: 'River Reports', src:'/RiverReports'}
        ],
        icons: [
          {icon:'mdi-facebook', link: 'https://www.facebook.com/Rockymtanglers'},
          {icon: 'mdi-twitter', link: 'https://twitter.com/rockymtanglers?lang=en'},
          {icon: 'mdi-instagram',link: 'https://www.instagram.com/rockymtanglers/?hl=en'}
        ]
      }
    },
    methods:
    {
      reroute: function(){
        window.location.replace('/')
      },
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
      login()
      {

        fb.auth.signInWithEmailAndPassword(this.email, this.password).then(cred =>{
          if(cred.user && cred.user.emailVerified == true)
          {
              this.dialogLogin = false;
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
        console.log("logged in!")
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

              this.links = [
                {id: 1, title: 'Add Kids Camp', src: '/AddKC'},
                {id: 2, title: 'Add Event', src: '/AddEvent'},
                {id: 3, title: 'Add Class', src: '/addClass'},
                {id: 4, title: 'Add Employee', src:'/AddEmployee'},
                {id: 5, title: 'Add Blog', src: '/AddBlog'},
               {id: 6, title: 'My Account', src: '/Account'},
               {id: 7, title: 'Update River Report', src: '/UpdateRR'},
               {id: 8, title: 'Event Portal', src: '/EventPortal'},
               {id:9, title: "Email Blast", src:'/Email'},
               {id:10, title: "Delete", src:'/Delete'},
               {id:11, title: "Modify", src:'/Modify'},
               {id:12, title: "Add Trip Dates", src:'/SpecialtyTrips'}
             ]
           }
          else
          {
              this.links =
              [
                {id:1, title: 'My Account', src:'/Account'},
                //{id:2, title: 'My Events/Classes', src:'/MyEvents'},
                //{id:3, title: 'Manage Subscriptions', src:'/MySubscriptions'},
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
