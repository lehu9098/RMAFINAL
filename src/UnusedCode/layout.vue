<template>
  <div id="app">
    <v-app id="inspire">
      <v-container class="grey lighten-5">
        <v-row v-for="n in 2" :key="n" :class="n === 1 ? 'mb-6' : ''" no-gutters>
          <v-col v-for="k in n + 1" :key="k">
            <v-card class="pa-2" outlined tile>
                {{ k }} of {{ n + 1 }}
            </v-card>
          </v-col>
        </v-row>
        <v-row class="">
        </v-row>
              <v-layout row wrap>
                <v-flex xs12 md6>
                  <v-btn outline block text class="primary"> 1 </v-btn>
                </v-flex>
                <v-flex xs4 md2>
                  <v-btn outline block text class="primary"> 2 </v-btn>
                </v-flex>
                <v-flex xs4 md2>
                  <v-card class="pa-2" outlined tile >
                    <p>
                      Heyyo
                    </p>
                  </v-card>
                </v-flex>
                <v-flex xs4 md2>
                  <v-btn outline block text class="primary"> 2 </v-btn>
                </v-flex>
              </v-layout>
              <v-layout row wrap justify-space-around class="ma-4">
                <v-flex xs4 md3>
                  <v-btn block class="success">1</v-btn>
                </v-flex>
                <v-flex xs4 md3>
                  <v-btn block class="success">1</v-btn>
                </v-flex>
                <v-flex xs4 md3>
                  <v-btn block class="success">1</v-btn>
                </v-flex>
              </v-layout>
              <v-layout row wrap justify-space-around class="ma-4">
                <v-flex xs4 md3>
                  <v-btn block class="success">1</v-btn>
                </v-flex>
                <v-flex xs4 md3>
                  <v-btn block class="success">1</v-btn>
                </v-flex>
                <v-flex xs4 md3>
                  <v-btn block class="success">1</v-btn>
                </v-flex>
              </v-layout>
              <v-layout row justify-center>
                <v-flex xs6 sm6 md6>
                <v-card>
                  <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                          <v-btn color="black" dark v-on="on" block>
                            Select River
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item v-for="(item, index) in items" :key="index" @click="on">
                            <v-btn block text>{{ item.name }}</v-btn>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-card>
                  </v-flex>
                  </v-layout>
      </v-container>
    </v-app>
  </div>
</template>
<script>
export default
{
  data() {
    return{
    }
  }
}


</script>
