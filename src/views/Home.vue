 <template>
   <v-layout justify-center id="Home">
      <v-flex xs12 sm12 md12>
        <v-layout justify-center>
          <v-flex xs12 sm12 md12>
                <phototog :images="images"></phototog>
          </v-flex>
        </v-layout>
    <v-container>
      <v-layout row justify-center >
            <v-flex xs12 sm12 md12>
              <div>
                <v-card tile flat class="ma-2 pa-2 border-thing card-overflow" height="auto">
                  <h2 style="border-bottom: 1px solid black; border-top: 1px solid black; text-align:center;" class="pa-4 font-weight-light"><strong>The Shop</strong></h2>
                  <p class="font-weight-light pt-5">
                    {{outputted}}
                  </p>
                </v-card>
                <v-card tile flat class="ma-2 pa-2 border-thing card-overflow">
                    <h2 style="border-bottom: 1px solid black; border-top: 1px solid black; text-align:center;" class="py-4 font-weight-light"><strong>Announcements</strong></h2>
                    <v-layout row justify-center>
                      <v-flex xs7 sm7 md6>
                          <v-img ref="announcementImage" :src="annoucnementObject.photoUrl" :max-height="annoucnementObject.height" :min-height="annoucnementObject.height" style="overflow:hidden; width: auto" class="mx-3 align-center" eager></v-img>
                      </v-flex>
                      <v-flex xs5 sm5 md6>
                        <v-card style="overflow: scroll" :height="annoucnementObject.height" scrollable flat>
                          <h2 style="border-bottom: 1px solid black;text-align:center;" class="ma-4 font-weight-light"><strong>{{annoucnementObject.title}}</strong></h2>
                          <p class="font-weight-light ma-10">
                            {{annoucnementObject.annoucement}}
                          </p>
                        </v-card>
                      </v-flex>
                      </v-layout>
                    </v-card>
                <upcomingEvents></upcomingEvents>
              </div>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12 class="ma-2">
            <guideOverlay></guideOverlay>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
            <!--<v-flex xs12 sm12 md12 class="ma-2">
            <h2 style="border-bottom: 1px solid black; border-top: 1px solid black; text-align:center;" class="pa-4 font-weight-light"><strong>Follow Rocky Mountain Anglers!</strong></h2>
          </v-flex>-->
          <v-flex xs12 sm6 md4 v-for="item in Info" :key="item.id">
            <photoShow :item="item"></photoShow> <!--flip over on clicks for information-->
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center  class="mt-2">
              <v-flex xs11 sm8 md9>
                <v-card flat tile height="300px">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3055.729825670466!2d-105.27215568511082!3d40.01448208792957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876bec2db1e143bb%3A0x80beb865b5b48351!2sRocky%20Mountain%20Anglers!5e0!3m2!1sen!2sus!4v1588285426286!5m2!1sen!2sus" width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="true" aria-hidden="false" tabindex="0"></iframe>
                </v-card>
              </v-flex>
              <v-flex xs11 sm3 md3>
                <v-card height="300" class="pa-5" style="overflow: scroll;" flat tile>
                  <h3>Address:</h3>
                  <p> 1904 Arapahoe Ave Boulder, Colorado 80302 </p>
                  <h3> Contact Information: </h3>
                  <p>303-447-2400 <br /> info@rockymtanglers.com</p>
                  <h3>Summer Hours:</h3>
                  <p>Monday-Saturday: 7am - 7pm <br/> Sunday: 8am - 6pm</p>
                  <h3>Winter Hours:</h3>
                  <p>Monday-Saturday: 8am - 6pm <br/> Sunday: 9am - 5pm</p>
                </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex xs12 sm12 md12>
            <brands></brands>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center class="ma-4">
          <v-flex xs12 sm8 md8>
              <h3 class="pa-4 font-weight-light" style="text-align: center;"><strong>Sign Up For Rocky Mountain Anglers Email Updates!</strong></h3>
          </v-flex>
          <v-flex xs12 sm8 md8>
              <v-layout row wrap justify-center>
                <v-flex xs10 sm10 md10>
                  <v-alert type="success" v-if="showEmail">Congrats you signed up for Rocky Mountain Anglers news letter!<v-btn text v-on:click="showEmail = false"><v-icon class="font-weight-light">close</v-icon></v-btn></v-alert>
                </v-flex>
                <v-flex xs10 sm10 md10>
                  <v-text-field outlined placeholder="Enter Your Email Here" v-model="email"></v-text-field>
                </v-flex>
                  <v-flex xs10 sm10 md2>
                    <v-btn block text class="ma-2" v-on:click="subscribe">
                      <h3 class="text-uppercase  font-weight-light" ><strong>Sign Up!</strong></h3>
                    </v-btn>
                  </v-flex>
                </v-layout>
          </v-flex>
        </v-layout>







    </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import fb from '@/fb'
import phototog from '@/components/carosel'
import photoShow from '@/components/homeView'
import upcomingEvents from '@/components/upcommingEvents2.vue'
import guideOverlay from '@/components/guideOverlay'
import brands from '@/components/brands'
export default {
  components:
  {
    phototog,
    photoShow,
    upcomingEvents,
    guideOverlay,
    brands
  },
  data(){
    return{
      showEmail: false,
      aboutRMA: "",
      outputted: "Colorado's Top Fly Shop! Serving the fly fishing community since 1989. Situated in the beautiful city of Boulder, Rocky Mountain Anglers is dedicated to supplying fly fishermen with high quality products essential to success on the river! Our friendly and knowledgeable staff can help every angler find exceptional fly fishing equipment, fly tying materials, and other related accessories. We also strive to inspire and grow the fly fishing community by providing outstanding fly fishing classes, fly tying lessons, and summer youth camps.",
      aboutID: "",
      src1: "../Photos/CCU/musicEvent.jpg",
      cordinates:{lad:'40.0086', long: '-105.331'},
      aboutClasses: "",
      aboutClassesURL: "",
      EmailInfo: {title: "Welcome to Rocky Mountain Anglers News Letter", body: "These Emails will contain notifications for Shop Deals, Upcomming Events and much more.", Subject:"Welcome To Rocky Mountain Anglers Mail List"},
      email: "",
      show: false,
      Info: [{id: 1, url: 'https://www.facebook.com/Rockymtanglers',show: false, title: 'mdi-facebook', src: require("../Photos/fish photos/IMG_0195.jpg"), description: "  Fly fishing is a wonderful way to escape the stress and commotion of everyday life and become completely immersed in the simplicity and serenity of the wild. To help novice anglers pursue the art of fly fishing, Rocky Mountain Anglers offers fly fishing classes which provide an excellent introduction to the sport and help develop the abilities required to fish various water conditions with success. Additionally, to reinforce newly acquired knowledge and skills, we encourage class participants to book a guided trip with one of the class instructors or guides at a 20% discount. So sign up for our inspiring and highly instructive fly fishing classes today!"},
      {id: 2, url: 'https://twitter.com/rockymtanglers?lang=en', show: false, title: 'mdi-twitter', src: require("../Photos/fish photos/272I7615.jpg"), description: "  Fly fishing is a wonderful way to escape the stress and commotion of everyday life and become completely immersed in the simplicity and serenity of the wild. To help novice anglers pursue the art of fly fishing, Rocky Mountain Anglers offers fly fishing classes which provide an excellent introduction to the sport and help develop the abilities required to fish various water conditions with success. Additionally, to reinforce newly acquired knowledge and skills, we encourage class participants to book a guided trip with one of the class instructors or guides at a 20% discount. So sign up for our inspiring and highly instructive fly fishing classes today!"},
      {id: 3, url: 'https://www.instagram.com/rockymtanglers/?hl=en', show: false, title: 'mdi-instagram', src: require("../Photos/fish photos/bow.jpg"), description: " Visit Rocky Mountain Anglers Blogs and discover the secrets of fly fishing Colorado's rivers and streams. Delve into stories of thrilling fly fishing adventures and learn the intricacies of fishing in diverse river conditions from anglers who not only cherish every minute on the water but also love sharing their fishing experiences."}],
      images: [require("../Photos/shopPhotos/DSCN1401 copy.jpg"),
        require("../Photos/shopPhotos/ron.jpg"),
        require("../Photos/shopPhotos/flies.jpg"),
        require("../Photos/shopPhotos/middle.jpg"),
        require("../Photos/shopPhotos/shirts.jpg"),
        require("../Photos/shopPhotos/shopside.jpg"),
      ],
      annoucnementObject: {
        annoucement: "",
        title: "",
        photoUrl: "",
        ratio: null,
        height: 375,
        storageName: ""
      }


  }
  },
  methods:
  {
    subscribe: function()
    {
      fb.db.collection("emailSubscribers").add({email: this.email}).then(() =>
      {
        const sendMail = fb.functions.httpsCallable('sendEmailWelcome');
        sendMail({email: this.email, info: this.EmailInfo}).then((result) => {
          console.log(result);
          this.showEmail = true;
        });
      })
    }
  },
  created()
  {
    fb.db.collection('upcomingEvent').orderBy("date").onSnapshot(res => { //onSnapshot takes a screen shot of the updated db after a change has occured
      const changes = res.docChanges();
      const today = new Date();
      const date = today.getFullYear()+'-'+ '0' +(today.getMonth()+1)+'-'+ '0' +today.getDate();
      changes.forEach(change =>
      {

        if(Date.parse(change.doc.data().date) < Date.parse(date) )
        {
            /*console.log(change.doc.data().date)
            console.log(Date.parse(date))
            console.log(Date.parse(change.doc.data().date))*/
            fb.db.collection('upcomingEvent').doc(change.doc.id).delete().then(()=>
            {
                console.log("Deleted from DB");

            })


        }
    });
  })

  fb.db.collection('Announcements').doc('dXPC6NqqtFIgFRIWfNGY').get().then((snapshot) =>
  {
    this.annoucnementObject = snapshot.data();
  })
}
}
</script>
<style scoped>
.card-overflow
{
  overflow: scroll;
}

.border-image
{
  border: 1px solid black;
}
.trans
{
  background-color: transparent;
}
.centered
{
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
