<template>
  <div>
      <div v-if="dataClicked">
        <input v-model="dataChanged">
        <button @click="submit"> Change </button>
      </div>
      <p v-else @click="dataClickity"> {{ dataSaved }} </p>
  </div>
</template>

<script>
export default {
    name: 'OverviewSubComponent',
    props : ['data'],
    data() {
        return {
            dataSaved : this.data,
            dataChanged : this.data,
            dataClicked : false
        }
    },
    methods : {
        dataClickity() {
            this.dataClicked = !this.dataClicked;
        },
        submit() {
            this.dataClicked = false;
            if (this.dataSaved == this.dataChanged)
                return;
            this.dataSaved = this.dataChanged;
            this.$emit('change-event', this.dataSaved);
        }
    }
}
</script>

<style>

</style>