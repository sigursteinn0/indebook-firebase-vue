<template>
  <div class="bordered">
      <div class="container">
        <p>Booked already?</p>
        <input v-model="booked" type="checkbox" class="form-input checkbox">
      </div>
      <input v-model="duration" type="text" class="form-input" placeholder="Duration(minutes)">
      <input v-model="ends" type="text" class="form-input" placeholder="Ends at what time?">
      <input v-model="customers" type="text" class="form-input" placeholder="How many customers?">
      <input v-model="service" type="text" class="form-input" placeholder="Service">
      <div>
          <input v-model="credOne" type="text" class="form-input" placeholder="Required credentials(optional)">
          <input v-model="credTwo" type="text" class="form-input" placeholder="Required credentials(optional)">
          <input v-model="credThree" type="text" class="form-input" placeholder="Required credentials(optional)">
          <input v-model="credFour" type="text" class="form-input" placeholder="Required credentials(optional)">
          <input v-model="credFive" type="text" class="form-input" placeholder="Required credentials(optional)">
      </div>
      <button @click="submit"> Submit </button>
  </div>
</template>

<script>

export default {
    name : 'CreateAppointmentButton',
    props : ['timeRange'],
    data() {
        return {
            booked : false,
            duration : '',
            ends : '',
            customers : '',
            service : '',
            credOne : '',
            credTwo : '',
            credThree : '',
            credFour : '',
            credFive : ''
        }
    },
    methods : {
        submit() {
            var arr = {
                booked : [this.booked], 
                date : [this.timeRange.dateStamp],
                time : [this.timeRange.timeStamp],
                duration : [this.duration],
                ends : [this.ends],
                customers : [this.customers], 
                service : [this.service],
                reqCredentials : [{
                    credOne : this.credOne, 
                    credTwo : this.credTwo, 
                    credThree : this.credThree, 
                    credFour : this.credFour, 
                    credFive : this.credFive
                }]
            };
            this.booked = false;
            this.duration = '';
            this.ends = '';
            this.customers = '';
            this.service = '';
            this.credOne = '';
            this.credTwo = '';
            this.credThree = '';
            this.credFour = '';
            this.credFive = '';
            this.$emit('appointment-event', arr)
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
input {
    margin : 0.5em 1.75em;
}
p {
    margin : 0.5em 0.5em 0.5em 1.75em;
}

.bordered {
    border-style: dotted;
}
.checkbox {
    margin : 1em 0.5em;
}
</style>