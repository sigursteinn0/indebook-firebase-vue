<template>
  <div>
      <div class="bordered" v-if="clicked">
          <CreateAppointmentTimeSub v-dialog v-for="item in timeRange" v-bind:key="item" v-bind:timeRange="item" v-on:appointment-event="register" />
          <button @click="clickity">Minimize</button>
      </div>
      <button v-else @click="clickity">{{ timeRange }}</button>
  </div>
</template>

<script>
import CreateAppointmentTimeSub from './CreateAppointmentTimeSub';

export default {
    name : 'CreateAppointmentTime',
    components : {
        CreateAppointmentTimeSub
    },
    props : ['timeRange', 'currDate'],
    data() {
        return {
            clicked : false,
        }
    },
    methods : {
        clickity() {
            this.clicked = !this.clicked;
            if (this.clicked) {
                var hour = this.timeRange[0] + '' + this.timeRange[1] + ':';
                console.log(hour);
                var date = this.currDate;
                console.log(date);
                var finalArr = [];
                var minute = 0;
                finalArr.push({
                    timeStamp : hour + 0 + '' + minute,
                    dateStamp : date
                });
                minute += 5;
                finalArr.push({
                    timeStamp : hour + 0 + '' + minute,
                    dateStamp : date
                });
                for (var i = 0; i < 10; i++) {
                    minute += 5;
                    finalArr.push({
                        timeStamp : hour + minute,
                        dateStamp : date
                    });
                }
                this.timeRange = finalArr;
            } else {
                this.timeRange = this.timeRange[0].timeStamp;
            }
        },
        register(arr) {
            this.clicked = false;
            this.timeRange = this.timeRange[0].timeStamp;
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

.bordered {
    border-style : dotted;
}
</style>