<template>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm12 md12>
        <div>
          <v-container>
            <v-layout row wrap justify-center>
              <v-flex sm11 xs11 md12>
                <v-btn text route to="/kidsCamp"><v-icon>navigate_before</v-icon>Camp</v-btn>
              </v-flex>
              <v-flex sm11 xs11 md12>
                <div class="pa-4 " style="border-bottom: 1px solid black; border-top: 1px solid black;">
                  <h1 style="text-align:center;" class="text-uppercase">{{title}}</h1>
                </div>
              </v-flex>
              <v-flex sm11 xs11 md12>
                <v-img :src="image" aspect-ratio="1.7778" class="align-center"></v-img>
              </v-flex>
              <v-flex xs11 sm9 md9>
                <div class="pa-4 ">
                  <p>{{about}}</p>
                </div>
              </v-flex>
              <v-flex xs11 sm3 md3>
                <div class="pa-4 ">
                  <h4>{{title}} Price</h4>
                  <ul v-for="c in cost" :key="c">
                    <li>
                      {{c}}
                    </li>
                  </ul>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-flex>
    </v-layout>
  </template>
  <script>
  export default
  {
    props:{
      title:
      {
        type: String,
        required: true
      },
      about:
      {
        type: String,
        required: true
      },
      photos:
      {
        type: Array,
        required: true
      },
      cost:
      {
        type: Array,
        required: true
      },
      image:{
        type: String,
        required: true
      }
    },
    data(){
      return{

      }
    }
  }
  </script>
