<template>
    <div>
        <div class="container button-container" v-if="login.loggedIn">
            <button @click="bookBookingsClickity"> Make bookings </button>
            <button v-if="login.loggedIn" @click="overviewClickity"> Overview </button>
            <button v-if="login.loggedIn" @click="checkBookingsClickity"> Check bookings </button>
            <button v-if="login.loggedIn" @click="createAppointmentsClickity"> Create appointment </button>
        </div>
        <div class="container button-container" v-else>
            <button @click="bookBookingsClickity"> Make bookings </button>
            <button class="disabled" disabled> Overview </button>
            <button class="disabled" disabled> Check bookings </button>
            <button class="disabled" disabled> Create appointment </button>
        </div>
        <OverviewComponent v-if="overviewButton" v-bind:login="login" />
        <BookBookingsComponent v-if="bookAppointmentButton" v-bind:login="login" />
        <div v-if="login.loggedIn">
            <CheckBookingsComponent v-if="checkBookingsButton" v-bind:login="login" />
            <CreateAppointmentsComponent v-if="createAppointmentsButton" v-bind:login="login" />
        </div>
    </div>
</template>

<script>
import BookBookingsComponent from './BookBookingsComponent';
import CheckBookingsComponent from './CheckBookingsComponent';
import CreateAppointmentsComponent from './CreateAppointmentsComponent';
import OverviewComponent from './OverviewComponent';

export default {
    name: 'FrontpageComponent',
    components : {
        BookBookingsComponent,
        CheckBookingsComponent,
        CreateAppointmentsComponent,
        OverviewComponent
    },
    props : ['login', 'loginLoading'],
    data() {
        return {
            overviewButton : false,
            bookAppointmentButton : false,
            checkBookingsButton : false,
            createAppointmentsButton : false
        }
    },
    methods : {
        bookBookingsClickity() {
            this.overviewButton = false;
            this.bookAppointmentButton = true;
            this.checkBookingsButton = false;
            this.createAppointmentsButton = false;
        },
        overviewClickity() {
            this.overviewButton = true;
            this.bookAppointmentButton = false;
            this.checkBookingsButton = false;
            this.createAppointmentsButton = false;
        },
        checkBookingsClickity() {
            this.overviewButton = false;
            this.bookAppointmentButton = false;
            this.checkBookingsButton = true;
            this.createAppointmentsButton = false;
        },
        createAppointmentsClickity() {
            this.overviewButton = false;
            this.bookAppointmentButton = false;
            this.checkBookingsButton = false;
            this.createAppointmentsButton = true;
        }
    }
}
</script>

<style  scoped>
    button {
        margin : 0.5em;
        height : 4em;
        width : 8em;
    }

    .container {
        margin : 8em 34% 0em 34%;
        width : 32%;
    }
    .disabled {
        background: grey;
    }

</style>