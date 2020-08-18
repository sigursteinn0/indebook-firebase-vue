<template>
    <div class="bordered">
        <p v-if="item.credOne"> {{ appointment.reqCredentials.credOne }} : {{ item.credOne }} </p>
        <p v-if="item.credTwo"> {{ appointment.reqCredentials.credTwo }} : {{ item.credTwo }} </p>
        <p v-if="item.credThree"> {{ appointment.reqCredentials.credThree }} : {{ item.credThree }} </p>
        <p v-if="item.credFour"> {{ appointment.reqCredentials.credFour }} : {{ item.credFour }} </p>
        <p v-if="item.credFive" > {{ appointment.reqCredentials.credFive }} : {{ item.credFive }} </p>
        <button v-if="notRemoved" @click="removeCustomer"> Remove customer </button>
    </div>
</template>

<script>
import { db } from '../firebaseConfig';

export default {
    name : 'BookingCredentials',
    props : ['item', 'login', 'appointment', 'bookingIndex', 'index'],
    data() {
        return {
            notRemoved : true
        }
    },
    methods : {
        removeCustomer() {
            this.notRemoved = false;
            var ref = db.collection('bookings').doc(this.login.username);
            var ref2 = ref.collection('appointments').doc(this.appointment.date);
            ref2.get().then(doc => {
                if (doc.exists) {
                    var { booking } = doc.data();
                    booking[this.bookingIndex].bookers.splice(this.index, 1);
                    booking[this.bookingIndex].reqCredentials.splice(this.index, 1);
                    ref2.set({
                        booking
                    });
                    if (this.appointment.booked) {
                        var ref3 = db.collection('appointments').doc(this.login.username);
                        var ref4 = ref3.collection('bookings').doc(this.appointment.date);
                        ref4.get().then(doc => {
                            var { booked, customers, date, duration, ends, reqCredentials, service, time } = doc.data();
                            booked[this.bookingIndex] = false;
                            ref4.set({
                                customers : customers,
                                booked : booked,
                                date : date,
                                duration : duration,
                                ends : ends,
                                service : service,
                                time : time,
                                reqCredentials : reqCredentials
                            });
                            this.$emit('refresh-event');
                        });
                    } else {
                        this.$emit('refresh-event');
                    }
                }
            });
        }
    }
}
</script>

<style scoped>
.bordered {
    border-style: dotted;
}
</style>