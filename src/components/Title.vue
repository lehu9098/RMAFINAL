<template>
  <div>
    <v-layout justify-center>
      <v-flex xs12 sm12 md12>
          <v-img src="../Photos/272I7729.jpg" aspect-ratio="2.0" class="opac">
              <v-layout justify-center class="d-none d-md-flex d-sm-flex">
                    <a href="#pg" class="scroll-button"><v-icon x-large class="white--text" id="bounce">arrow_downward</v-icon></a>
              </v-layout>
          </v-img>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>

export default {

}
</script>

<style scoped>
.title{
  overflow-y: scroll;
  scroll-behavior: smooth;
}
a{
  text-decoration: none;
  color: black;
}
.scroll-button{
  margin-top: 40%;
}

#bounce{
  animation: bounce 2s infinite;
}
@keyframes bounce
{
  0%   {transform: translate(0);}
  50%  {transform: translate(0, 25px);}
  100% {transform: translate(0);}
}


</style>
