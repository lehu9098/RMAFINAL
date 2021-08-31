<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm12 md12>
      <div>
        <v-container>
          <v-layout row wrap justify-center>
            <v-flex sm11 xs11 md12>
              <div class="pa-4 " style="border-bottom: 1px solid black; border-top: 1px solid black;">
                <h1 style="text-align:center;" class="text-uppercase">Tying Videos</h1>
              </div>
            </v-flex>
            <v-flex xs10 sm10 md10>
              <v-container class="pa-2 white">
                <v-text-field class="pa-2" outlined type="text" v-model="search" placeholder="Search Videos by Title" v-on:keyup="searcher()"></v-text-field>
              </v-container>
            </v-flex>
            <v-flex xs8 sm8 md8 v-for="video in videoArray" :key="video.url" class="d-none d-md-flex d-sm-flex">
              <iframe width="100%" height="500px" :src="video.videourl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="ma-3" v-show="video.show"></iframe>
            </v-flex>
            <v-flex xs8 sm8 md8 v-for="video in videoArray" :key="video.url" class="d-md-none d-sm-none">
              <iframe width="100%" height="200px" :src="video.videourl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="ma-1" v-show="video.show"></iframe>
            </v-flex>
            <v-flex xs8 sm8 md8>
              <v-btn text @click="showMore()" block v-if="showIcon"><v-icon x-large>keyboard_arrow_down</v-icon></v-btn>
            </v-flex>

          </v-layout>
        </v-container>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>

export default{
  data() {
    return{
      videoArray: [],
      search: "",
      nextPageToken: "",
      showIcon: false
    }
  },
  methods:
  {
    showMore(){
      fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=id,snippet&pageToken='+this.nextPageToken+'&playlistId=PLWJ38-5LjdgB8xOnGPArT4aB7xJ5j0gtt&key=AIzaSyBcQlS-eZEBSNwCzMOLgHIdTdiGMJCFTqw').then(response => response.json()).then(data => data).then((data) => {
        this.nextPageToken = data.nextPageToken;
        data.items.forEach((item) => {
          var url = "https://www.youtube.com/embed/" + item.snippet.resourceId.videoId;
          this.videoArray.push({videourl: url, videoTitle: item.snippet.title, show: true}); //add to front of the list
        });
      });
      if(this.videoArray.length % 5 == 0){
        this.showIcon = true;
      }
      if(this.videoArray.length % 5 != 0){
        this.showIcon = false;
      }

    },
    searcher()
    {
      console.log()
      var video = '';
      for(video of this.videoArray)
      {
        if(video.videoTitle.match(this.search))
        {
          video.show = true
        }
        else {
          video.show= false
        }
      }
    }
  },
  created()
  {
    fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=id,snippet&playlistId=PLWJ38-5LjdgB8xOnGPArT4aB7xJ5j0gtt&key=AIzaSyBcQlS-eZEBSNwCzMOLgHIdTdiGMJCFTqw').then(response => response.json()).then(data => data).then((data) => {
      //console.log(data)
      this.nextPageToken = data.nextPageToken;
      data.items.forEach((item) => {
        var url = "https://www.youtube.com/embed/" + item.snippet.resourceId.videoId;
        this.videoArray.push({videourl: url, videoTitle: item.snippet.title, show: true});
      });
    });
    if(this.videoArray.length > 5){
      this.showIcon = true;
    }

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
