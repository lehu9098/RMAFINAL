<template>
    <div>
    <mobileMenu></mobileMenu>
    <div class="d-none d-md-flex d-sm-flex">
    <v-app-bar flat class="d-flex justify-space-around white"  height="155px;">
        <!-- to getback to old design all you have to do is get ride of column and rows-->
        <v-row>
          <v-col md="12">
            <v-img src="../Photos/Logo/RMALogo copy22.png" class="imgbg"></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="12">
          <v-btn v-for="tab in tabName" :key="tab.id" text class="font-weight-light pa-3 ma-3" route :to="tab.src" exact inline-block>
            <span class="text-uppercase" text>{{tab.title}}</span>
          </v-btn>

          <v-btn v-for="tab in tabName2" :key="tab.id" text class="font-weight-light pa-3 ma-3" route :to="tab.src" exact inline-block>
            <span class="text-uppercase" text>{{tab.title}}</span>
          </v-btn>
          <!--Account Dialog -->
          <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" text icon tile class="font-weight-light pa-3 ma-3">
                  <span class="text-lowercase font-weight-light" text> <v-icon>mdi-account</v-icon> </span>
                </v-btn>
                </template>
                  <v-list class="grey lighten-1 pa-4">
                    <v-list-item>
                      <v-btn @click="on = false" block text><v-icon class="font-weight-light">close</v-icon></v-btn>
                    </v-list-item>
                    <v-list-item v-show="showLogin">
                      <v-btn  @click="dialogLogin= true" block text class="text-uppercase font-weight-light">Login</v-btn>
                    </v-list-item>
                    <v-list-item v-show="show" v-for="link in links" :key="link.id">
                      <v-btn text route :to="link.src" block  @click="dialogAccount = false">
                        <span class="text-uppercase font-weight-light" >{{link.title}}</span>
                      </v-btn>
                    </v-list-item>
                    <v-list-item v-show="show">
                      <v-btn text route to="/" block v-on:click="logout">
                        <span class="text-uppercase font-weight-light" > Log Out </span>
                      </v-btn>
                    </v-list-item>
                </v-list>
          </v-menu>
          <!--login Dialog -->
          <v-dialog width="500" v-model="dialogLogin">
          <v-card>
              <v-card-title class="headline grey lighten-2" primary-title >
                Log In
              </v-card-title>
              <v-form class="pa-2" ref="form">
              <v-text-field placeholder="Enter Email" v-model="email"></v-text-field>
              <v-text-field placeholder="Enter Password" v-model="password" type="password"></v-text-field>
              <v-btn @click="login" to="/"> LogIn </v-btn>
              <v-card-text> Dont have a account? <v-btn class="font-weight-light" route to="/SignUp" text @click="dialogLogin=false; dialogAccount=false">Sign Up Here</v-btn></v-card-text>
              <p> Forgot Password? <v-btn class="font-weight-light" route to="/Forgot" text @click="dialogLogin=false; dialogAccount=false">Reset</v-btn></p>
              <p class="red--text lighten-2">{{error}}</p>
              </v-form>
            </v-card>
          </v-dialog>
          </v-col>
        </v-row>
    </v-app-bar> <!--app makes it stationary at the top-->

    </div>
</div>
</template>

<script>
import fb from "@/fb"
import mobileMenu from "../components/mobileMenu.vue"
export default
{
  components:
  {
    mobileMenu
  },

  data() {
    return{
      dialogAccount: false,
      dialogLogin: false,
      showLogin: true,
      addLinks: [],
      show: false,
      links: [],
      email: "",
      password:"",
      error: "",
      on: false,
      tabName: [
        {id: 1, title:'Home', src:"/"},
        {id: 5, title: 'Guided Trips', src: '/GuideTrips'},
        {id: 7, title: 'Events', src:'/Events'},
        {id: 8, title: 'Classes', src: '/Classes'}
      ],
      tabName2: [
        {id: 9, title: 'River Reports', src:'/RiverReports'},
        {id: 6, title: 'Blog', src: '/Blog'},
        {id: 4, title: 'Employees', src: '/Employees'}
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
              {id: 1, title: 'Add Kids Camp', src: '/AddKidsCamp'},
              {id: 2, title: 'Add Event', src: '/AddEvent'},
              {id: 3, title: 'Add Class', src: '/addClass'},
              {id: 4, title: 'Add Employee', src:'/AddEmployee'},
              {id: 5, title: 'Add Blog', src: '/AddBlog'},
             {id: 6, title: 'My Account', src: '/Account'},
             {id: 7, title: 'Update River Report', src: '/UpdateRR'},
             {id: 8, title: 'Event Portal', src: '/EventPortal'},
             {id:9, title: "Email Blast", src:'/Email'}
             //{id:10, title: "scheduler", src:'/Schedule'},
             //{id:11, title: "Employee schedule", src:'/EmployeeSchedule'}
           ]
         }
        else
        {
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
router-link
{
  text-decoration: none;
}
.bg
{
  background-image: url("../Photos/IMG_8831.jpg");
  background-position: center;
  background-size: cover;
}
.bg2
{
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  background-color: transparent;
}
.imgbg
{
  border: 1px solid black;
  border-radius: 100%;
}
</style>
