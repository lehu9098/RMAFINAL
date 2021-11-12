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
          dbName: 'TyingClasses',
          subdbName: 'myEvents',
          eventName: "Tying Classes",
          classorevent: "Classes",
          about: "For thousands of years, fishermen have used feathers and furs of wild game to create artificial flies. Binding various materials to a hook, in order to entice fish to strike, has evolved into an art form that has been embraced by the fly fishing community. Selecting the right hooks, choosing alluring threads and feathers, and building durable and effective flies is what captivates anglers and kindles their passion for fly fishing. So let Rocky Mountain Anglers inspire you and help you continue the time-honored tradition of fly tying, by signing up for private fly tying lessons!",
          images1: [require('../../Photos/tying/tying.jpg'), require("../../Photos/Bugs and Brews/tyingstones.jpg"), require("../../Photos/Bugs and Brews/hoppers 1.jpg"),]
        }
    }
  }
</script>
