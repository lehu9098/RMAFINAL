<template>
    <v-carousel hide-delimiters height="auto" cycle>
      <v-carousel-item  v-for="(image,i) in images" :key="i" aspect-ratio="1.7778" eager>
        <v-img :src="image" :lazy-src="image" aspect-ratio="1.7778" class="align-center" eager></v-img>
      </v-carousel-item>
    </v-carousel>
</template>
<script>
export default
{
  props:{
    images:
    {
      type: Array,
      required: true
    }
  }



}


</script>
<style scoped>


</style>
