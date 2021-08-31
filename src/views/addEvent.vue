<template>
  <AddForm :type="type" :dbName="dbName" :items="items"></AddForm>
</template>

<script>
import AddForm from '../components/AddForm.vue'
export default
{
    components:
    {
      AddForm
    },
    data(){
      return{
        type: 'Event',
        dbName: 'Events',
        items: ['FishAlongs', 'BugsandBrews','CreekCleanup', 'otherEvents']
      }
  }
}
</script>
