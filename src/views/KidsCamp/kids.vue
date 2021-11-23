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
      image: require("@/Photos/Kids Camp/duncankidscamp.jpg"),
      title: "Kids Camp",
      cost: ["$495"],
      dbName: "kidsCamp",
      type: "kids",
      about: "Ages 7-9 8:30am-4:30pm. T, W, TH. RMA’s kids fly fishing camp is an all day camp for young anglers with less on the water experience. We spend time on ponds, lakes, and streams; fishing for trout, bass, bluegill and other species in and around Boulder. Trips to private waters are also included. All equipment is provided: rods, reels, leaders, tippets, flies, etc. Let our friendly, youthful, and patient staff, help your young angler be successful on the water. Daily activities also include fly tying, casting lessons, and bug collecting."
    }
  }
}
</script>
