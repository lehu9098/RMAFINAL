<template>
  <v-layout row wrap justify-center class="mt-2">
    <v-flex xs12 sm12 md12>
        <v-layout row wrap justify-center>
          <v-flex sm10 xs10 md10>
            <v-container class="pa-4" style="border-bottom: 1px solid black; border-top: 1px solid black;">
              <h1 style="text-align:center;" class="text-uppercase">Blog</h1>
            </v-container>
          </v-flex>
          <v-flex xs10 sm10 md10>
            <v-container class="white">
              <v-text-field class="" outlined type="text" v-model="search" placeholder="Search Blogs by name or date" v-on:keyup="searcher()"></v-text-field>
            </v-container>
          </v-flex>
          <v-flex xs10 sm10 md10 v-for="blog in BlogArray" :key="blog.id">
            <v-container class="d-flex justify-start border-thing innerbox" v-if="blog.shower">
            <v-layout justify-center>
              <v-flex xs6 sm6 md6>
                <v-img :src="blog.images[0]" aspect-ratio="1.7"></v-img>
              </v-flex>
              <v-flex xs6 sm6 md6>
                  <h3 style="text-align:center;"><v-btn route :to="'/Blog/' + blog.id" text>{{blog.title}}</v-btn></h3>
                  <h4 style="text-align:center;">{{blog.date}}</h4>
                  <h4 style="text-align:center;" class="mt-2">By {{blog.author}}</h4>
                  <v-card-text class="d-none d-sm-flex mx-2">{{blog.content}}...</v-card-text>
              </v-flex>
            </v-layout>
          </v-container>
          </v-flex>
        </v-layout>
    </v-flex>
</v-layout>

</template>
<script>
//import searchMixin from '../mixins/searchMixins';
import fb from '@/fb'
export default{
  data() {
    return{
      BlogArray: [],
      search: ""
    }},
    methods:
    {
      searcher: function()
      {
        var blog = '';
        for(blog of this.BlogArray)
        {
          if(blog.title.match(this.search) || blog.date.match(this.search))
          {
            blog.shower = true
          }
          else {
            blog.shower = false
          }
        }
      }
    },
    created()
    {
      fb.db.collection('Blogs').orderBy('utc', 'desc').get().then((snapshot) =>{
        //console.log(snapshot.docs)
        snapshot.docs.forEach( doc => {
        //  console.log(doc.data())
          this.BlogArray.push({
            id: doc.id,
            title: doc.data().title,
            author: doc.data().author,
            content: doc.data().content.slice(0, 250),
            images: doc.data().images,
            date: doc.data().date,
            shower: true
          })
        })
      })
    }

}
</script>
<style scoped>
.border-thing
{
  border-top: .5px solid grey;
  border-bottom: .5px solid grey;
}
.router-link
{
  text-decoration: none;
}
.trans
{
  opacity: .8;
  z-index: 2;
}
.innerbox
{
  z-index: 10;
  background-color: white;
}

</style>
