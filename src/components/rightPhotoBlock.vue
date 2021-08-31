<template>
  <div class="my-2">
    <v-layout>
      <v-flex xs12 sm12 md12>
        <div>
          <v-layout row wrap justify-center>
            <v-flex xs10 sm10 md4>
              <v-img :src="photo" class="d-none d-md-flex"></v-img>
            </v-flex>
            <v-flex xs10 sm10 md8>
              <div class="pa-6">
                <h3 style="text-align: center;">{{title}}</h3>
                <ul v-for="point in info" :key="point" class="mt-2">
                  <li style="list-style-type: none;">{{point}}</li>
                </ul>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default
{
  props:
  {
    photo:{
      type: String,
      require: true
    },
    title:
    {
      type:String,
      require: true
    },
    info:
    {
      type: Array,
      require: true
    }

  }
}
</script>
