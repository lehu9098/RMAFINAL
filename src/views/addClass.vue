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
        type: 'Class',
        dbName: 'classes',
        items: ['IntroClasses', 'TyingClasses', 'otherClasses']
      }
  }
}
</script>
