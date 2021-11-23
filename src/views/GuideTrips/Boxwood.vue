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
      title: 'Boxwood Gulch and Long Meadow Ranch',
      trip: 'Boxwood',
      about: 'Throughout the season we host several trips to both Boxwood Gulch and Long Meadow Ranch. These “sister” properties are adjacent to each other, and often we have both properties for dates during the season. Located on the North Fork of the South Platte, these properties are @1.25 hours from Boulder, and are great for anglers of any skill level. With a beautiful clubhouse , patio, and fire pit; Boxwood is a spectacular section of river home to a variety of trout including: Brook, Brown, Rainbow, Palomino, Tiger, and Cutthroat. Just upstream Longmeadow boasts a larger section of river to fish with all the same species present. Both properties hold some extremely large rainbows and it is not uncommon to hook fish over 25 inches and close to the 10 lb mark. Landing these magnum trout is sometimes easier said than done. Each date at the ranch we try to bring a group of 6-12 anglers, depending upon the seasonal conditions. We bring a chef to prepare lunch for the group and any dietary restrictions can be accommodated. Prices for the day at Boxwood are $400 per angler, and Long Meadow  is $325/ rod. See our calendar of events for our dates at Boxwood and Long Meadow this season. These trips are “feel good” days and great for building memories to share with friends and family. Call the shop to book your “feel good” trip to the ranch today.',
      photos: [require('../../Photos/fish photos/boxwoodbrown.jpg'), require('../../Photos/Boxwood/girlboxwood.jpg'),require('../../Photos/Boxwood/Chrisbigbox.jpg'),  require('../../Photos/Boxwood/IMG_0356.jpg'),  require('../../Photos/Boxwood/justin2.png'), require('../../Photos/Boxwood/chrisboxwood.jpg')]
    }
  }
}

</script>
