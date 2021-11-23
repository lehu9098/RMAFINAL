<template>
  <div>
  <About :eventName="eventName" :about="about" :images1="images1" :classorevent="classorevent"></About>
  <Class :dbName= "dbName" :subdbName= "subdbName" :eventName="eventName" :about="about"></Class>

  </div>
</template>

<script>
//import fb from '@/fb'
import Class from '../../components/Event-Class.vue'
import About from '../../components/AboutEvent-Class.vue'
export default
{
    components:
    {
      Class,
      About
    },
    data(){
      return{
          dbName: 'FishAlongs',
          subdbName: 'myEvents',
          eventName: "Fish Alongs",
          classorevent: "Events",
          about: "Come fishing with the Rocky Mountain Anglers family and crew. During the shoulder months when the shop slows a little we organize meet ups to fish hot spots throughout the Fall and winter. A standard day for the fish-alongs starts at the fly shop to grab last minute flies/tackle etc. We then car pool or caravan to the river or destination usually 1-2 hours away. Destinations include but not limited to: South Platte, Blue, Eagle, Arkansas, Colorado, St.Vrain, Big Thompson, South Boulder Creek, and Boulder Creek. Fish-alongs are a great way to learn waters you are not familiar with, as well as where it might be overperforming; and you may even come out of it with a new buddy to fish with. Early afternoon we get the grill fired up to share a “pot luck” style lunch and see how the day shaped up for everyone. Side note: you have not lived until you’ve had a hot dog topped with coleslaw and all the fixin’s. Come share a cold beer and a warm brat with the RMA family and crew at one of our Fish-A-Longs. FREE…..but bring something to share and to sip on.",
          images1: [require("../../Photos/Fish Alongs/Pueblo_18.jpg"), require("../../Photos/Fish Alongs/Pueblo_01.jpg"), require("../../Photos/Fish Alongs/IMG_1701.jpg"), require("../../Photos/Fish Alongs/jakeyampa.jpg"), require("../../Photos/Fish Alongs/Bearedman.jpg"), require("../../Photos/fish photos/IMG_2648.jpg")],

        }
    }
  }
</script>
