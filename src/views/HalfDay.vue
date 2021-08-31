<template>
  <GT :photos="photos" :about="about" :title="title" :cost="cost"></GT>
</template>
<script>
import GT from '../components/GTnormal.vue'
export default{
  components:
  {
    GT
  },
  data(){
    return{
      title: 'Half Day Guided Trips',
      about: 'Half day trips explore local waters such as Boulder Creek, the St. Vrain, and the Big Thompson River. Get intimate with these local waters as one of our experienced guides puts you on the fish. We are the most beginner friendly fly shop on the planet, and all our guides are pleasant, patient, and excellent at helping beginners learn the sport!',
      photos: [require('../Photos/Guidetrips/IMG_3810.jpg'), require('../Photos/Guidetrips/friends.jpg'), require('../Photos/fish photos/272I5818.jpeg'), require("../Photos/fish photos/ben T 1.jpg"), require('../Photos/fish photos/brookie.jpg'), require('../Photos/fish photos/IMG_0234.jpg')],
      cost: ["1 Person $250", "2 Person $350", "3 Person $450", "* Maximum of 3 anglers/ clients per guide on all guided trips"]
    }
  }
}

</script>
