 <template>
    <div>
        <div class="middle">
            <p>Where are you booking?</p>
            <input v-model="locationHref">
            <button @click="check">Search</button>
        </div>
        <div class="container-column" v-if="currentLocation">
            <div>
                <button @click="lastWeek"> Last week </button>
                <button @click="nextWeek"> Next week </button>
            </div>
            <div class="container">
                    <p class="desc"> Title : {{title}} </p>
                    <p class="desc"> Description : {{description}} </p>
                    <p class="desc"> Opening hours : {{openingHours}} </p>
                    <p class="desc"> Closing hours : {{closingHours}} </p>
            </div>
            <div class="container min-height" v-if="notLoading">
                <BookBookingsContainer v-for="(item, index) in currDate" v-bind:key="index" v-bind:login="login"
                    v-bind:currDate="item" v-bind:currDay="weekDays[index]" v-bind:currLocation="currentLocation" />
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../firebaseConfig';
import Vue from 'vue';
import BookBookingsContainer from './BookBookingsContainer';

export default {
    name : 'BookBookingsComponent',
    props : ['login'],
    components : {
        BookBookingsContainer
    },
    data() {
        return {
            locationHref : '',
            currentLocation : '',
            savedLocation : '',
            currDate : [1, 2, 3, 4, 5, 6, 7],
            weekDays : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            weeks : 0,
            notLoading : true,
            title : '',
            description : '',
            openingHours : '',
            closingHours : ''
        }
    },
    methods : {
        check() {
            console.log(this.locationHref);
            var ref = db.collection('location').doc(this.locationHref);
            ref.get().then(doc => {
                console.log(ref);
                if (doc.exists) {
                    var { title, description, openingHours, closingHours } = doc.data();
                    this.title = title;
                    this.description = description;
                    this.openingHours = openingHours;
                    this.closingHours = closingHours;
                    this.currentLocation = this.locationHref;
                } else {
                    this.currentLocation = '';
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
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
.middle {
    display: inline-block;
    width : 15%;
    margin: 1em 41.5% 1em 41.5%;
}
.min-height {
    width : 100%;
    min-height : 30em;
}
.desc {
    margin : 0em 1em 0em 1em;
}
.container-column {
    width : 100%;
}
</style>