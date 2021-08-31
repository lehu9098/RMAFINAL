<template>
  <div>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12 md12>
        <div>
          <v-btn text href="/Blog" class="white"><v-icon>navigate_before</v-icon>Blogs</v-btn>
        </div>
      </v-flex>
      <v-flex xs12 sm12 md12>
        <v-container>
          <phototog :images="images"></phototog>
        </v-container>
    </v-flex>
      <v-flex xs12 sm12 md12>
        <v-card class="contain pa-3 white card-overflow" max-height="500" outlined>
          <h2 style="text-align: center;">{{blog.title}}</h2>
          <h5 style="text-align: center;" class="mt-2"> By {{blog.author}}</h5>
          <v-card-text class="whitespace">{{blog.content}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>
<script>
import fb from '@/fb'
import phototog from '@/components/carosel'
export default {
  components:
  {
    phototog
  },
  data () {
    return {
      id: this.$route.params.id,
      blog: {},
      images: []
    }
  },
  created()
  {
    //console.log(this.id)
    fb.db.collection('Blogs').doc(this.id).get().then((snapshot) => {
      //console.log(snapshot.data());
      this.blog = snapshot.data();
      this.images = snapshot.data().images;
    //  this.blog.content = this.blog.content.replace(/<br>/g, '<br />\n');
    })
  }
}
</script>
<style scoped>
.contain
{
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
}
p
{
  font-family: ui-rounded;
}
.card-overflow
{
  overflow: scroll;
}
.whitespace{
  white-space: pre-wrap;
}

</style>
