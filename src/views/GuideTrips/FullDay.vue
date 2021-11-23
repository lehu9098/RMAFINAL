<template>
  <GT :photos="photos" :about="about" :title="title" :cost="cost"></GT>
</template>
<script>
import GT from '@/components/GTnormal.vue'
export default{
  components:
  {
    GT
  },
  data(){
    return{
      title: 'Full Day Guided Trips',
      about: 'Full day trips often venture farther from Boulder and may fish the varied waters of Rocky Mountain National Park or the Blue River at Silverthorne. Full days may also split the experience between two locations such as the Big Thompson River and Boulder Creek. Our full day trips include lunch as well.',
      photos: [require('@/Photos/fish photos/IMG_0103.jpg'), require('@/Photos/Guidetrips/Rockymt.jpg'),require("@/Photos/fish photos/cutneck.jpg"), require('@/Photos/fish photos/SBCcutbow.jpg'), require('@/Photos/Guidetrips/cutty.jpg'), require("@/Photos/fish photos/greenback.jpg")],
      cost: ["1 Person $350", "2 Person $450", "3 Person $550", "* Maximum of 3 anglers/ clients per guide on all guided trips"]
    }
  }
}

</script>
