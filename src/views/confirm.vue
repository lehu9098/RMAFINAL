<template>
  <div>
     <v-alert type="success" v-if="show"> You successfully Confirmed Your Attendance! We will see you at Rocky Mountain Anglers Soon!</v-alert>
     <v-alert type="error" v-if="showError"> Sorry the event you signed up for is currently full. Check back in before the event to see if any slots have opened back up!</v-alert>
  </div>
</template>
<script>
import fb from '@/fb'
export default{
  data () {
    return {
      id: this.$route.params.id,
      dbName: this.$route.params.dbName,
      eventID: this.$route.params.eventID,
      date: this.$route.params.date,
      time: this.$route.params.time,
      title: this.$route.params.title,
      email: this.$route.params.email,
      show: false,
      showError: false
    }
  },
  created()
  {
    //console.log(this.id, this.dbName, this.eventID)
    fb.db.collection(this.dbName).doc(this.eventID).get().then((doc) => {
      if(doc.data().capacity > 0){
            fb.db.collection(this.dbName).doc(this.eventID).collection('participants').doc(this.id).set({confirmation: true}, {merge: true}).then(() => {
            fb.db.collection('users').doc(this.id).collection('myEvents').doc(this.eventID).set({confirmation: true}, {merge: true}).then(() => {
              this.show = true;
            }).then(() => {
              fb.db.collection(this.dbName).doc(this.eventID).get().then((doc)=>{
                let newCapacity = doc.data().capacity - 1; //downsizes capacity by 1;
                //console.log(doc.data().capacity)
                fb.db.collection(this.dbName).doc(this.eventID).set({capacity: newCapacity}, {merge: true})
              })
            }).then(() => {
              const sendConfirmation = fb.functions.httpsCallable('sendConfirmation');
              sendConfirmation({email: this.email, title: this.title, date: this.date, time: this.time}).then((result) => {
                console.log(result);
              });
            })
          })
      }
      else{
        this.showError = true;
      }
    });
  }
}
</script>
