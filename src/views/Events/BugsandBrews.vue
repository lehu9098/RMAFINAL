<template>
  <div>
    <About :eventName="eventName" :about="about" :images1="images" :classorevent="classorevent"></About>
    <Class :dbName= "dbName" :subdbName= "subdbName" :eventName="eventName" :about="about" ></Class>
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
          dbName: 'BugsandBrews',
          subdbName: 'myEvents',
          eventName: "Bugs 'N' Brews",
          about: "Have you been considering tying flies? With our Bugs ‘n Brews events you can learn the skills needed to compose your own flies with expert guidance from our staff. We gather at local breweries, pubs, and restaurants alike making it a super easy going and fun learning environment. We choose a series of flies ranging from basic to more complex, and all skill levels are welcome at these events! The end of the evening brings a loosely judged competition where prizes are awarded for Best, Worst, and anything in between. We supply all the tying materials and tools necessary to get those who attend twisting up flies. Your first pint is on us, so come on by and see what it’s all about! Look for a Bugs-N-Brews at a brewery close to you. FREE.",
          classorevent: "Events",
          images: [ require("../../Photos/Bugs and Brews/BandB copy.jpeg"),  require("../../Photos/Bugs and Brews/bandbeer.jpg"),  require("../../Photos/Bugs and Brews/beer.jpg"), require("../../Photos/Bugs and Brews/IMG_0715 copy.jpg"), require("../../Photos/Bugs and Brews/IMG_1381.jpg"), require("../../Photos/Bugs and Brews/IMG_0121.jpg")]
        }
    }
  }
</script>
