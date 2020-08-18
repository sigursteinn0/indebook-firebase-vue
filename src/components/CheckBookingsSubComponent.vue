<template>
    <div v-if="notLoading">
        <CheckBooking v-for="(item, index) in appointments" v-bind:key="index" v-on:refresh-event="refresh"
            v-bind:appointment="item" v-bind:login="login" v-bind:bookingIndex="item.index" />
    </div>
</template>

<script>
import { db } from '../firebaseConfig';
import Vue from 'vue';
import CheckBooking from './CheckBooking';

export default {
    name : 'CheckBookingsSubComponent',
    props : ['login', 'currDate'],
    components : {
        CheckBooking
    },
    data() {
        return {
            appointments : [],
            notLoading : false
        }
    },
    methods : {
        refresh() {
            this.appointments = [];
            this.onCreate();
        },
        onCreate() {
            this.notLoading = false;
            var ref = db.collection('appointments').doc(this.login.username);
            var ref2 = ref.collection('bookings').doc(this.currDate);
            ref2.get().then(doc => {
                if (doc.exists) {
                    var { booked, customers, date, duration, ends, service, time, reqCredentials } = doc.data();
                    for (var i = 0; i < booked.length; i++) {
                        this.appointments.push({
                            booked : booked[i],
                            customers : customers[i],
                            date : date[i],
                            duration : duration[i],
                            ends : ends[i],
                            service : service[i],
                            time : time[i],
                            reqCredentials : reqCredentials[i],
                            index : i
                        });
                    }
                    var ref3 = db.collection('bookings').doc(this.login.username);
                    var ref4 = ref3.collection('appointments').doc(this.currDate);
                    ref4.get().then(doc => {
                        if (doc.exists) {
                            for (var i = 0; i < this.appointments.length; i++) {
                                var { bookers, reqCredentials } = doc.data().booking[i];
                                var tempIndex = this.appointments[i];
                                tempIndex.bookers = bookers;
                                tempIndex.credentials = reqCredentials;
                                Vue.set(this.appointments, i, tempIndex);
                            }
                            this.appointments.sort((a, b) => (a.time > b.time) ? 1 : -1);
                        }
                        this.notLoading = true;
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    },
    created() {
        this.onCreate();
    }
}
</script>

<style scoped>

</style>