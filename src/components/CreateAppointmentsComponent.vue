<template>
    <div class="container-column">
        <div>
            <button @click="lastWeek"> Last week </button>
            <button @click="nextWeek"> Next week </button>
        </div>
        <div class="container">
            <div class="bordered" v-for="(item, index) in currDate" v-bind:key="item">
                <p>{{ item }}</p>
                <p>{{ weekDays[index] }}</p>
                <CreateAppointmentsTime v-for="time in timeRange" v-bind:currDate="item" v-bind:timeRange="time" v-bind:key="time" v-on:appointment-event="register" />
            </div>
        </div>
    </div>
</template>

<script>
import CreateAppointmentsTime from './CreateAppointmentTime';
import Vue from 'vue';
import { db } from '../firebaseConfig';

export default {
    name : 'CreateAppointmentsComponent',
    components : {
        CreateAppointmentsTime
    },
    props : ['login'],
    data() {
        return {
            timeRange : [],
            currDate : [1, 2, 3, 4, 5, 6, 7],
            weekDays : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            weeks : 0
        }
    },
    methods : {
        register(arr) {
            var ref = db.collection('appointments').doc(this.login.username);
            var ref2 = ref.collection('bookings').doc(arr.date[0]);
            ref2.get().then(doc => {
                if (doc.exists) {
                    var customers = doc.data().customers;
                    customers.push(arr.customers[0]);
                    var booked = doc.data().booked;
                    booked.push(arr.booked[0]);
                    var date = doc.data().date;
                    date.push(arr.date[0]);
                    var duration = doc.data().duration;
                    duration.push(arr.duration[0]);
                    var ends = doc.data().ends;
                    ends.push(arr.duration[0]);
                    var service = doc.data().service;
                    service.push(arr.service[0]);
                    var time = doc.data().time;
                    time.push(arr.time[0]);
                    var reqCredentials = doc.data().reqCredentials;
                    reqCredentials.push(arr.reqCredentials[0])
                    ref2.set({
                        customers : customers,
                        booked : booked,
                        date : date,
                        duration : duration,
                        ends : ends,
                        service : service,
                        time : time,
                        reqCredentials : reqCredentials
                    });
                } else {
                    ref2.set(arr);
                }
                this.registerTwo(arr);
            }).catch(function(error) {
                console.log(error);
            });
        },
        registerTwo(arr) {
            var ref = db.collection('bookings').doc(this.login.username);
            var ref2 = ref.collection('appointments').doc(arr.date[0]);
            ref2.get().then(doc => {
                if (doc.exists) {
                    var obj = {
                        bookers : [],
                        reqCredentials : []
                    }
                    var booking = doc.data().booking;
                    booking.push(obj);
                    ref2.set({
                        booking
                    });
                } else {
                    ref2.set({
                        booking : [{
                            bookers : [],
                            reqCredentials : []
                        }]
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        getMonday() {
            var monday = new Date();
            while (monday.getDay() != 1) {
                monday.setDate(monday.getDate() - 1);
            }
            monday.setDate(monday.getDate() + this.weeks);
            for (var i = 0; i < 7; i++) {
                Vue.set(this.currDate, i, monday.getDate() + '-' + (monday.getMonth()+1) + '-' + monday.getFullYear());
                monday.setDate(monday.getDate() + 1);
            }
        },
        nextWeek() {
            this.weeks += 7;
            this.getMonday();
        },
        lastWeek() {
            this.weeks -= 7;
            this.getMonday();
        }
    },
    created() {
        this.getMonday();
        var dHours = 0;
        var ddHours = 0;
        for (var j = 0; j<24; j++) {
            var timeStamp = ddHours + '' + dHours + ':00';
            this.timeRange.push(timeStamp);
            dHours++;
            if (dHours == 10) {
                dHours = 0;
                ddHours++;
            }
        }
    }
}
</script>

<style scoped>
p {
    margin: 1em 3em;
}

.bordered {
    margin : 0.1%;
    width: 14%;
}
.container-column {
    width : 100%;
}
.container {
    margin : 0em;
}
</style>