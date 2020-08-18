<template>
  <div class="container">
      <div class="element">
        <p> siggira@gmail.com </p>
        <p> Reykjavík, Iceland </p>
        <p> </p>
      </div>
      <div class="element">
        <h3> About </h3>
        <p> This site was made to help small companies, independent contractors and anyone who requires appointment schedules.
            It's still in early development phases but every functional requirements has been implemented. To get started, simply
            create an account with an email and password and create appointments! If you are so inclined to want other people to book
            your appointments you will have to give them your email. Hope everything works out!
        </p>
        <p> If you come across a bug, please send me an email about it. </p>
      </div>
      <div class="element">
        <p class="vue-p"> Powered by Vue</p>
        <img class="vue" @click="vueClickity" src="../assets/logo.png">
      </div>
      <div class="element">
        <p class="firebase-p"> and Firebase </p>
        <img class="firebase" @click="firebaseClickity" src="../assets/logo-vertical.png">
      </div>
  </div>
</template>

<script>
export default {
    name : 'Footer',
    methods : {
        vueClickity() {
            window.open('https://vuejs.org/');
        },
        firebaseClickity() {
            window.open('https://firebase.google.com/');
        }
    }
}
</script>

<style scoped>
p {
    max-width : 20em;
    margin : 1em;
}
h3 {
  margin : 1em;
}

.vue {
  height: 50%;
  width : 50%;
  margin : 10% 25% 15% 25%;
  cursor : pointer;
}
.vue-p {
  display: inline-block;
  margin : 2em 33% 1em 33%;
  width : auto;
}
.firebase {
  height: 62.5%;
  width : 37.5%;
  margin : 11% 31.25% 7% 31.25%;
  cursor : pointer;
}
.firebase-p {
  display : inline-block;
  margin : 2em 37% 1em 37%;
  width : auto;
}
.container {
  border-style: none; 
  background-color : #80d0ff;
  bottom : 0;
  width : 100%;
  height : auto;
}
.element {
  width : 25%;
  height : 100%;
}
</style>