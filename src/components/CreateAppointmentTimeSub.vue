<template>
  <div>
      <div v-if="clicked">
        <CreateAppointmentButton v-bind:timeRange="timeRange" v-on:appointment-event="register"/>
        <button @click="clickity">Cancel</button>
      </div>
      <button @click="clickity" v-else>{{ timeRange.timeStamp }}</button>
  </div>
</template>

<script>
import CreateAppointmentButton from './CreateAppointmentButton';

export default {
    name : 'CreateAppointmentTimeSub',
    components : {
        CreateAppointmentButton
    },
    props : ['timeRange'],
    data() {
        return {
            clicked : false
        }
    },
    methods : {
        clickity() {
            this.clicked = !this.clicked;
        },
        register(arr) {
            this.clicked = !this.clicked;
            this.timeRange = this.timeRange.timeStamp;
            this.$emit('appointment-event', arr);
        }
    }
}
</script>

<style scoped>
button {
    width : 90%;
    margin : 0.1em 5%;
    min-height: 2em;
}
</style>