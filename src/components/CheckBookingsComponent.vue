<template>
    <div class="container-column" v-if="notLoading">
        <div>
            <button @click=lastWeek> Last week </button>
            <button @click=nextWeek> Next week </button>
        </div>
        <div class="container">
            <div class="bordered" v-for="(item, index) in currDate" v-bind:key="item">
                <p>{{ item }} : {{ weekDays[index] }}</p>
                <CheckBookingsSubComponent v-bind:currDate="item" v-bind:login="login" />
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import CheckBookingsSubComponent from './CheckBookingsSubComponent';

export default {
    name : 'CheckBookingsComponent',
    components : {
        CheckBookingsSubComponent
    },
    props : ['login'],
    data() {
        return {
            currDate : [1, 2, 3, 4, 5, 6, 7],
            weekDays : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            weeks : 0,
            notLoading : true
        }
    },
    methods : {
        async getMonday() {
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
        async nextWeek() {
            this.notLoading = false;
            this.weeks += 7;
            await this.getMonday();
            this.notLoading = true;
        },
        async lastWeek() {
            this.notLoading = false;
            this.weeks -= 7;
            await this.getMonday();
            this.notLoading = true;
        }
    },
    created() {
        this.getMonday();
    }
}
</script>

<style scoped>
.bordered {
    margin : 0.1%;
    width: 14%;
}
.container-column {
    width : 100%;
}
.container {
    width: 100%;
}
</style>