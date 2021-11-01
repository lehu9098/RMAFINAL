<template>
  <v-layout row wrap justify-center>
    <v-flex xs11 sm11 md10>
      <div class="Employees">
          <v-layout row wrap justify-center>
            <v-flex sm10 xs10 md12>
              <div class="pa-4 mt-2" style="border-bottom: 1px solid black; border-top: 1px solid black;">
                <h1 style="text-align:center;" class="text-uppercase">Staff</h1>
              </div>
            </v-flex>
          </v-layout>
            <v-layout row wrap inline-block>
              <v-flex xs12 sm6 md4 v-for="employee in Employees" :key="employee.id">
                  <v-card outlined tile raised inline-block class="grey lighten-1 ma-4 card-overflow" max-height="450" scrollable>
                    <v-img aspect-ratio="1.4" class="white--text align-end text-center text-uppercase" :src="employee.url">
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <h3 class="text-center pt-2">{{employee.name}}</h3>
                    <v-card-text max-height="5px" class="text-center"><b>{{employee.position}}</b></v-card-text>
                    <v-card-actions class="centered">
                      <v-btn class="mx-10" icon @click="employee.show = !employee.show"> Show Bio <v-icon> perm_identity </v-icon></v-btn>
                      </v-card-actions>
                    <v-expand-transition>
                      <div v-show="employee.show">
                        <v-divider></v-divider>
                        <v-card-text>
                          {{employee.bio}}
                        </v-card-text>
                      </div>
                    </v-expand-transition>
                  </v-card>
              </v-flex>
          </v-layout>
  </div>
</v-flex>
</v-layout>
</template>

<script>
import fb from '@/fb'
export default {

  data () {
  return {
    Employees:[],
    show: false
  }
},
  created()
  {
    fb.db.collection('users').onSnapshot(res => {
          const changes = res.docChanges();
          //console.log(changes);
          changes.forEach(change =>
          {
            fb.db.collection('users').doc(change.doc.id).get().then((snapshot) =>
            {

              if(snapshot.data().employeeStatus == true && snapshot.data().email != "lehu9098@colorado.edu"){
                this.Employees.push({
                  id: change.doc.id,
                  name: snapshot.data().fullName,
                  phone: snapshot.data().phoneNumber,
                  bio: snapshot.data().bio,
                  position: snapshot.data().position,
                  show: false,
                  url: snapshot.data().photoID
                })
              }
            })
          })
        })
      }
  }
</script>
<style scoped>
.card-overflow
{
  overflow: scroll;

}
.centered
{
  display: flex;
  align-items: center;
  justify-content: center;
}



</style>
