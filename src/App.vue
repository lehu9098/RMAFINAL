<template>
  <v-app>
    <!--<Title class="scroll-container"></Title>-->
    <v-content>
      <Nav class="fix" id="pg"></Nav>
      <router-view class="marginBot"></router-view>
      <Footer class="bottomfix"></Footer>
    </v-content>
  </v-app>
</template>

<script>
//import NavBar from '@/components/NavBar';
//import SecondBar from '@/components/secondaryNav';
import Nav from '@/components/topNav';
import Footer from '@/components/footer';
//import Title from '@/components/Title';
export default {
  components:
  {
    Nav,
    Footer,
    //Title
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>

.scroll-container{
  overflow-y: scroll;
  scroll-behavior: smooth;
}
.margin-top
{
  margin-top: 10px;
}
.background
{
  background-image: url("https://www.muralsyourway.com/media/catalog/product/cache/1/base/1200x/040ec09b1e35df139433887a97daa66f/w/e/weathered-grey-wooden-planks-wallpaper-mural.jpg");
  background-size: auto;
  background-repeat: repeat;
}
.background-top
{
  background-color: lightgrey;
  background-size: auto;
}
.fix
{
  position: sticky;
  top:0; /* Position the navbar at the top of the page */
  width: auto;
  z-index: 100;
}
.bottomfix
{
  position: absolute;
  bottom: 0; /* Position the navbar at the top of the page */
  width: 100%;

}
.marginBot
{
  margin-bottom: 100px;
}
.tit
{
  background-size: contain;
}
</style>
