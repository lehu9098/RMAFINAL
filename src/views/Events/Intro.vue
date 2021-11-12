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
          dbName: 'IntroClasses',
          subdbName: 'myEvents',
          eventName: "FREE Intro to Fly Fishing (Fly Fishing 101)",
          classorevent: "Classes",
          about: "With our intro to fly fishing course, we look to give beginning anglers all the tools they need to catch fish independently with a fly rod. We split the class into three sections: knots and rigging, casting, and Q&A/gear/general knowledge. After this two to three-hour course, beginners will learn how to set up and rig their own fly rod and reel, become proficient at the basics of casting, and learn some basic stream entomology and knowledge on how to approach trout in a stream. If you’re feeling overwhelmed by the mountain of information there is to learn when starting out fly fishing, this class is a perfect way to distill things down and make fly fishing more approachable, leading to more fish caught and better times on the water. We consider ourselves the most beginner-friendly fly shop on the planet, and taking this course is sure to show you why!",
          images1: []
        }
    }
  }
</script>
