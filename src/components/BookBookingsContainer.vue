<template>
  <div class="bordered">
      <p> {{ currDate }} : {{ currDay }} </p>
      <p v-if="noBookings"> No available appointments </p>
      <BookBookingsButton v-for="(item, index) in appointments" v-bind:key="index" v-bind:appointment="item" 
        v-bind:currLocation="currLocation" v-bind:login="login" v-bind:index="item.index" />
  </div>
</template>

<script>
import { db } from '../firebaseConfig';
import BookBookingsButton from './BookBookingsButton';

export default {
    name : 'BookBookingsContainer',
    components : {
        BookBookingsButton
    },
    props : ['currLocation', 'currDate', 'currDay', 'login'],
    data() {
        return {
            appointments : [],
            loading : true,
            noBookings : true
        }
    },
    methods : {
        onCreate() {
            this.loading = true;
            var ref = db.collection('appointments').doc(this.currLocation);
            var ref2 = ref.collection('bookings').doc(this.currDate);
            ref2.get().then(doc => {
                if (doc.exists) {
                    for (var i = 0; i < doc.data().booked.length; i++) {
                        this.appointments.push({
                            booked : doc.data().booked[i],
                            customers : doc.data().customers[i],
                            date : doc.data().date[i],
                            duration : doc.data().duration[i],
                            ends : doc.data().ends[i],
                            reqCredentials : doc.data().reqCredentials[i],
                            service : doc.data().service[i],
                            time : doc.data().time[i],
                            index : i
                        });
                        if (!(doc.data().booked[i])) {
                            this.noBookings = false;
                        }
                    }
                    this.appointments.sort((a, b) => (a.time > b.time) ? 1 : -1);
                    this.loading = false;
                } else {
                    this.loading = false;
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
.bordered {
    margin : 0.1%;
    width: 14%;
}
</style>