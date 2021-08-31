<template>
  <nav>
    <v-footer light padless>
          <v-layout justify-center>
            <v-flex xs12 sm12 md12>
              <v-card flat tile class="grey darken-1 lighten-1 white--text text-center">
                <v-card-text>
                  <v-btn text class="white--text font-weight-light" href="https://www.facebook.com/Rockymtanglers"><v-icon>mdi-facebook</v-icon></v-btn>
                  <v-btn text class="white--text font-weight-light" href="https://twitter.com/rockymtanglers?lang=en"><v-icon>mdi-twitter</v-icon></v-btn>
                  <v-btn text class="white--text font-weight-light" href="https://www.instagram.com/rockymtanglers/?hl=en"><v-icon>mdi-instagram</v-icon></v-btn>
                  <v-btn text class="white--text font-weight-light" href="https://www.youtube.com/user/rockymtanglers"><v-icon>mdi-youtube</v-icon></v-btn>
                  <v-btn text class="white--text font-weight-light" route to="/policies">policies</v-btn>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
    </v-footer>
    </nav>
</template>
<script>

export default
{
  data: () => ({
      icons: [
        {icon:'mdi-facebook', link: 'https://www.facebook.com/Rockymtanglers'},
        {icon: 'mdi-twitter', link: 'https://twitter.com/rockymtanglers?lang=en'},
        {icon: 'mdi-instagram',link: 'https://www.instagram.com/rockymtanglers/?hl=en'}
      ],
    }),
}
</script>
