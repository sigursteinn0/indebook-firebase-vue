<template>
  <div>
      <div v-if="!appointment.booked">
        <div class="bordered" v-if="clicked">
            <p>Kl: {{ appointment.time }}</p>
            <p>Duration in minutes: {{ appointment.duration }}</p>
            <p>Type of service: {{ appointment.service }}</p>
            <p>Finishes at {{ appointment.ends }}</p>
            <input v-model="credOne" v-if="appointment.reqCredentials.credOne" v-bind:placeholder="appointment.reqCredentials.credOne">
            <input v-model="credTwo" v-if="appointment.reqCredentials.credTwo" v-bind:placeholder="appointment.reqCredentials.credTwo">
            <input v-model="credThree" v-if="appointment.reqCredentials.credThree" v-bind:placeholder="appointment.reqCredentials.credThree">
            <input v-model="credFour" v-if="appointment.reqCredentials.credFour" v-bind:placeholder="appointment.reqCredentials.credFour">
            <input v-model="credFive" v-if="appointment.reqCredentials.credFive" v-bind:placeholder="appointment.reqCredentials.credFive">
            <button @click="book" v-if="notBooking"> {{ bookButton }} </button>
            <button @click="clickity"> Minimize </button>
        </div>
        <div v-else>
            <button @click="clickity"> {{ appointment.service }} : {{ appointment.time }} </button>
        </div>
      </div>
  </div>
</template>

<script>
import { db } from '../firebaseConfig';

export default {
    name : 'BookBookingsButton',
    props : ['appointment', 'login', 'index', 'currLocation'],
    data() {
        return {
            credOne : '',
            credTwo : '',
            credThree : '',
            credFour : '',
            credFive : '',
            bookButton : 'Book',
            notBooking : true,
            clicked : false
        }
    },
    methods : {
        book() {
            var check = this.checkCredentials();
            if (check) {
                this.notBooking = false;
                var user = 'anonymous';
                if (this.login.username)
                    user = this.login.username;
                var ref = db.collection('bookings').doc(this.currLocation);
                var ref2 = ref.collection('appointments').doc(this.appointment.date);
                ref2.get().then(doc => {
                    if (doc.exists) {
                        var booking = doc.data().booking;
                        var bookers = booking[this.index].bookers;
                        bookers.push(user);
                        var reqCredentials = booking[this.index].reqCredentials;
                        reqCredentials.push({
                            credOne : this.credOne,
                            credTwo : this.credTwo,
                            credThree : this.credThree,
                            credFour : this.credFour,
                            credFive : this.credFive
                        });
                        booking[this.index].bookers = bookers; 
                        booking[this.index].reqCredentials = reqCredentials;
                        ref2.set({
                            booking
                        });
                        this.bookButton = 'Book again';
                        this.credOne = '';
                        this.credTwo = '';
                        this.credThree = '';
                        this.credFour = '';
                        this.credFive = '';
                        if (bookers.length == this.appointment.customers) {
                            this.appointment.booked = true;
                            this.fullyBook();
                        }
                        this.notBooking = true;
                    } else {
                        console.log("hmm");
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            }
        },
        fullyBook() {
            var ref = db.collection('appointments').doc(this.currLocation);
            var ref2 = ref.collection('bookings').doc(this.appointment.date);
            ref2.get().then(doc => {
                if (doc.exists) {
                    var { booked, customers, date, duration, ends, service, time, reqCredentials } = doc.data();
                    booked[this.index] = true;
                    ref2.set({
                        booked,
                        customers,
                        date,
                        duration,
                        ends,
                        reqCredentials,
                        service,
                        time
                    });
                } else {
                    console.log('skrítið');
                }
            }).catch(function(error) {
                console.log(error);
            })   
        },
        checkCredentials() {
            if (this.appointment.reqCredentials.credOne && !this.credOne) {
                return false;
            } else if (this.appointment.reqCredentials.credTwo && !this.credTwo) {
                return false;
            } else if (this.appointment.reqCredentials.credThree && !this.credThree) {
                return false;
            } else if (this.appointment.reqCredentials.credFour && !this.credFour) {
                return false;
            } else if (this.appointment.reqCredentials.credFive && !this.credFive) {
                return false;
            }
            return true;
        },
        clickity() {
            this.clicked = !this.clicked;
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