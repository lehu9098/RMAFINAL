<template>
  <div>
    <Confirm :Name="Name" :dbName="dbName" :subdbName="subdbName"></Confirm>
  </div>
</template>
<script>
import Confirm from '../components/ConfirmationPage.vue'
export default
{
  components:
  {
    Confirm
  },
  data(){
    return{
      Name: 'Events',
      dbName: 'Events',
      subdbName: 'myEvents'
    }
}
}


</script>
