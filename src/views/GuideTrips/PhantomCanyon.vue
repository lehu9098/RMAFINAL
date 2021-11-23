<template>
  <GT :photos="photos" :about="about" :title="title" :trip="trip"></GT>
</template>
<script>
import GT from '@/components/GT.vue'
export default{
  components:
  {
    GT
  },
  data(){
    return{
      title: 'Phantom Canyon',
      trip: 'Phantom',
      about: 'Each season we host a few trips to Phantom Canyon.  Through an ongoing partnership with The Nature Conservancy we are able to guide a few small groups to this property on the North Fork of the Poudre River.  This trip is a short 1 mile hike into a road less stretch of water fishing for wild brown and rainbow trout.  Access here is extremely limited and the fish are very willing to come to a fly, often with reckless abandon.  This is a unique, special place with almost 4 miles of  wild river and trail to explore.  The price for a trip to Phantom Canyon is $400 per angler, lunch and flies included.  On a trip to Phantom an angler may hike as much as 4 miles and might see evidence of deer, raptors, sheep, rattlers, bear, or other predators.  Fishing in Phantom Canyon may be the closest thing to fishing 100 years ago.  Check our calendar of events for the next trip to Phantom Canyon, or call the shop.  ',
      photos: [require('@/Photos/Phantom/IMG_5635.jpg'), require('../../Photos/Phantom/chubby.jpg'), require('../../Photos/Phantom/IMG_5631 2.jpg'),  require('../../Photos/Phantom/IMG_5627 3.jpg'),  require('../../Photos/Phantom/DSCF0432.jpg'),  require('../../Photos/Phantom/DSCF0416.jpg'),]
    }
  }
}

</script>
