<template>
  <div>
    <v-container>
    <v-row no-gutters>
        <v-col xs="12" sm="12" md="12" class="">
              <v-btn text route to="/Classes"><v-icon>navigate_before</v-icon>{{classorevent}}</v-btn>
        </v-col>
    </v-row>
    </v-container>
    <Class :dbName= "dbName" :subdbName= "subdbName" :eventName="eventName" :about="about" ></Class>
  </div>
</template>

<script>
//import fb from '@/fb'
import Class from '../components/Event-Class.vue'
export default
{
    components:
    {
      Class
    },
    data(){
      return{
          dbName: 'otherClasses',
          subdbName: 'myEvents',
          eventName: "Other Classes",
          about: "This IS Misc Events Page",
          classorevent: "Classes"
        }
    }
  }
</script>
