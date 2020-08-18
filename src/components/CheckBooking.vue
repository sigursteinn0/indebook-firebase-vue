<template>
    <div class="bordered">
        <p> Starts : {{ appointment.time }} </p>
        <p v-if="appointment.booked"> Fully Booked </p>
        <p> Customers : {{ appointment.bookers.length }} </p>
        <p> Space for {{ appointment.customers - appointment.bookers.length }} more customers </p>
        <p> Duration : {{ appointment.duration }} </p>
        <p> Ends at : {{ appointment.ends }} </p>
        <p> Service : {{ appointment.service }} </p>
        <p> List of customers </p>
        <div v-for="(item, index) in appointment.credentials" v-bind:key="index">
            <BookingCredentials v-bind:bookingIndex="bookingIndex" v-bind:item="item" v-bind:appointment="appointment" 
                v-bind:index="index" v-bind:login="login" v-on:refresh-event="refresh" />
        </div>
        <button v-if="notDeleteLoading" @click="deleteAppointment"> Delete appointment </button>
    </div>
</template>

<script>
import { db } from '../firebaseConfig';
import BookingCredentials from './BookingCredentials';

export default {
    name : 'CheckBooking',
    props : ['appointment', 'login', 'bookingIndex'],
    components : {
        BookingCredentials
    },
    data() {
        return {
            notDeleteLoading : true
        }
    },
    methods : {
        refresh() {
            console.log("gerist");
            this.$emit('refresh-event');
        },
        deleteAppointment() {
            this.notDeleteLoading = false;
            var ref = db.collection('bookings').doc(this.login.username);
            var ref2 = ref.collection('appointments').doc(this.appointment.date);
            ref2.get().then(doc => {
                if (doc.exists) {
                    var { booking } = doc.data();
                    booking.splice(this.bookingIndex, 1);
                    ref2.set({
                        booking
                    });
                    var ref3 = db.collection('appointments').doc(this.login.username);
                    var ref4 = ref3.collection('bookings').doc(this.appointment.date);
                    ref4.get().then(doc => {
                        var { booked, customers, date, duration, ends, reqCredentials, service, time } = doc.data();
                        booked.splice(this.bookingIndex, 1);
                        customers.splice(this.bookingIndex, 1);
                        date.splice(this.bookingIndex, 1);
                        duration.splice(this.bookingIndex, 1);
                        ends.splice(this.bookingIndex, 1);
                        reqCredentials.splice(this.bookingIndex, 1);
                        service.splice(this.bookingIndex, 1);
                        time.splice(this.bookingIndex, 1);
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
                }
            });
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