<template>
    <v-card outlined inline-block class="ma-4 card-overflow grey lighten-2" max-height="500px" scrollable>
        <v-img height="300" class="white--text align-end text-center text-uppercase" :src="RiverInfo.url"></v-img>
        <h3 class="text-center pt-2">{{RiverInfo.name}}</h3>
        <v-card-text max-height="5px"><b>Distance: {{RiverInfo.drive}}</b></v-card-text>
        <v-card-actions>
          <v-btn block class="ma-2" icon @click="RiverInfo.show = !RiverInfo.show"> River Description <v-icon> expand_more </v-icon></v-btn>
        </v-card-actions>
            <v-expand-transition>
              <div v-show="RiverInfo.show">
                <v-divider></v-divider>
                <v-card-text>
                    {{RiverInfo.bio}}
                </v-card-text>
                </div>
              </v-expand-transition>

   </v-card>
</template>
<script>

export default {
  props:{
    RiverInfo:
    {
      type: Object,
      required: true //if the type passed in isnt array doesnt wprl
    }
  },
  data () {
  return {
    Employees:[],
    show: false
  }
}
}
</script>
<style scoped>
.card-overflow
{
  overflow: scroll;
}
</style>
