<template>
  <div>
    <About :eventName="eventName" :about="about" :images1="images" :classorevent="classorevent"></About>
    <Class :dbName= "dbName" :subdbName= "subdbName" :eventName="eventName" :about="about"></Class>
  </div>
</template>

<script>
//import fb from '@/fb'
import Class from '../components/Event-Class.vue'
import About from '../components/AboutEvent-Class.vue'
export default
{
    components:
    {
      Class,
      About
    },
    data(){
      return{
          dbName: 'CreekCleanup',
          subdbName: 'myEvents',
          eventName: "Creek Clean Up",
          classorevent: "Events",
          about: "Interested in giving back??  Join us for a Creek Clean Up.  One of the best ways to give back is to join the RMA crew for a stream clean up along our most local water, Boulder Creek.  Throughout the year we organize small and large groups for several Creek Clean Ups along the Creek.  Each year we pull more than 50 cubic yards of trash and debris from the creek habitat and her waters.  Whether it is through town, or up in the canyon along hwy 119; Boulder Creek experiences quite a bit of use throughout the year. On one of our stream clean ups we choose a section in need of love and spend a couple of hours picking up trash and debris.  We supply gloves and bags and tongs; but please dress appropriately for spending time in and around the creek picking up trash.  The event usually ends with a meet up back at the shop and some sort of picnic or BBQ depending upon attendance and seasonality.  These Creek Clean Ups are appropriate for all ages and are very family friendly.  Come join the fun at our next Creek Clean Up.  Please check the calendar for upcoming Creek Clean Ups or call the shop for the latest.",
          images: [require("../Photos/CCU/IMG_4555.jpg"), require("../Photos/CCU/IMG_4587.jpg"), require("../Photos/CCU/IMG_4584.jpg"), require("../Photos/CCU/Food.jpg"), require("../Photos/CCU/IMG_4563.jpg"), require("../Photos/CCU/IMG_4579.jpg")]
        }
    }
  }
</script>
