<template>
    <div>
        <div class="container" v-if="title">
            <div class="element">
                <p> Title : </p>
                <OverviewSubComponent v-bind:data="title" v-on:change-event="changeTitle" />
            </div>
            <div class="element">
                <p> Description : </p>
                <OverviewSubComponent v-bind:data="description" v-on:change-event="changeDescription" />
            </div>
            <div class="element">
                <p> Opening Hours : </p>
                <OverviewSubComponent v-bind:data="openingHours" v-on:change-event="changeOpeningHours" />
            </div>
            <div class="element">
                <p> Closing Hours </p>
                <OverviewSubComponent v-bind:data="closingHours" v-on:change-event="changeClosingHours" />
            </div>
        </div>
        <div v-else> 
        </div>
    </div>
</template>

<script>
import { db } from '../firebaseConfig';
import OverviewSubComponent from './OverviewSubComponent';

export default {
    name : 'OverviewComponent',
    props : ['login'],
    components : {
        OverviewSubComponent
    },
    data() {
        return {
            title : '',
            description : '',
            openingHours : '',
            closingHours : ''
      }
    },
    methods : {
        update() {
            if (this.login.username) {
                var ref = db.collection('location').doc(this.login.username);
                ref.get().then(doc => {
                    if (doc.exists) {
                        if (doc.data().title)
                            this.title = doc.data().title;  
                        if (doc.data().description)
                            this.description = doc.data().description;
                        if (doc.data().openingHours)
                            this.openingHours = doc.data().openingHours;
                        if (doc.data().closingHours)
                            this.closingHours = doc.data().closingHours;
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            } else {
                this.title = '';
                this.description = '';
                this.openingHours = '';
                this.closingHours = '';
            }
        },
        changeTitle(data) {
            var modifiedData = {
                title: data,
                description : true,
                openingHours : true,
                closingHours : true
            }
            this.updateData(modifiedData);
        },
        changeDescription(data) {
            var modifiedData = {
                title: true,
                description : data,
                openingHours : true,
                closingHours : true
            }
            this.updateData(modifiedData);
        },
        changeOpeningHours(data) {
            var modifiedData = {
                title: true,
                description : true,
                openingHours : data,
                closingHours : true,
            }
            this.updateData(modifiedData);
        },
        changeClosingHours(data) {
            var modifiedData = {
                title: true,
                description : true,
                openingHours : true,
                closingHours : data,
            }
            this.updateData(modifiedData);
        },
        updateData(modifiedData) {
            var ref = db.collection('location').doc(this.login.username);
            ref.get().then(doc => {
                if (doc.exists) {
                    if (modifiedData.title === true)
                        modifiedData.title = doc.data().title;
                    if (modifiedData.description === true)
                        modifiedData.description = doc.data().description;
                    if (modifiedData.openingHours === true)
                        modifiedData.openingHours = doc.data().openingHours;
                    if (modifiedData.closingHours === true)
                        modifiedData.closingHours = doc.data().closingHours;
                    ref.set(modifiedData);
                }
            }).catch(function(error) {
                    console.log(error);
            });
        }
    },
    created() {
        this.update();
    }
}
</script>

<style scoped>
.container {
    margin : 5em 20% 5em 20%;
    width : 60%;
}
.element {
    width : 25%;
    padding : 2em;
}
</style>