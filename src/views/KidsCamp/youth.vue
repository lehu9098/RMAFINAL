<template>
  <div>
    <camp :title="title" :cost="cost" :about="about" :image="image"></camp>
    <upcoming :dbName= "dbName" :subdbName= "subdbName" :title="title" :type="type"></upcoming>
  </div>
</template>

<script>
import camp from '../../components/camppage.vue'
import upcoming from '../../components/kidsCampShow.vue'
export default{
  components:
  {
    camp,
    upcoming
  },
  data(){
    return{
      image: require("@/Photos/Kids Camp/justinkidscamp.jpg"),
      title: "Youth Camp",
      cost: ["$650"],
      dbName: "kidsCamp",
      type: "youth",
      about: "Ages 9-14 8am-4:30pm M, T, W, Th. Our Youth camp is a great fly fishing day camp for young anglers who have fishing experience or have taken one of our camps in years prior. We still provide all the equipment for each participant if needed. The camp spends more time on small streams and moving waters such as Saint Vrain Creek, Boulder Creek, and the Big Thompson. Trips to private water are also included."
    }
  }
}
</script>
