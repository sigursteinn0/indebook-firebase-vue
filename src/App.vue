
<template>
  <div id="app">
    <div class="content-wrap">
      <p v-if="loginLoading"> Login Loading </p>
      <div v-else>
        <LoginHeaderComponent v-bind:login="login" v-on:login-event="loggin" v-on:logout-event="logout" v-on:register-event="register" />
      </div>
      <FrontpageComponent v-if="!loggingOut" v-bind:login="login" v-bind:loginLoading="loginLoading"/>
    </div>
    <Footer />
  </div>
</template>

<script>
import { auth, db } from './firebaseConfig';
import LoginHeaderComponent from './components/LoginHeaderComponent';
import FrontpageComponent from './components/FrontpageComponent';
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    LoginHeaderComponent,
    FrontpageComponent,
    Footer
  },
  data() {
    return {
      loginLoading : true,
      loggingOut : false,
      login : {
        loggedIn : false,
        username : '',
        attempt : false
      }
    }
  },
  methods : {
    loggin(usern, passw) {
      this.loginLoading = true;
      auth.signInWithEmailAndPassword(usern, passw).catch(error =>  {
        this.loginLoading = false;
        this.login.attempt = true;
        console.log(error);
      });
    },
    async logout() {
      this.loginLoading = true;
      this.loggingOut = true;
      await auth.signOut();
      this.loginLoading = false;
      this.loggingOut = false;
    },
    async register(usern, passw) {
      this.loginLoading = true;
      var worked = true;
      await auth.createUserWithEmailAndPassword(usern, passw).catch(error =>  {
        this.loginLoading = false;
        worked = false;
        console.log(error);
      });
      if (worked) {
        this.addUser(usern);
      }
    },
    addUser() {
      var ref = db.collection('location').doc(this.login.username);
      var obj = {
        title : 'Click here to edit the title',
        description : 'Click here to edit your description',
        openingHours : 'Click here to edit opening hours',
        closingHours : 'Click here to edit closing hours'
      }
      ref.set(obj);
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.login.loggedIn = true;
        this.login.username = user.email;
      } else {
        this.login.loggedIn = false;
        this.login.username = '';
      }
      this.login.attempt = false;
      this.loginLoading = false;
    });
  }
}
</script>

<style>
body {
  margin : 0px;
  font-family: Arial, Helvetica, sans-serif;  
  line-height: 1.4;
  background: #f0d0ff;
}
button {
  position : relative;
  background: blueviolet;
  color : #f0d0ff;
  border-radius: 25px; 
  outline: none;
}

.container {
  margin : auto;
  display: inline-flex;
  flex-direction: row;
}
.container-column {
  margin : auto;
  display: inline-flex;
  flex-direction: column;
}
.bordered {
  border-style : solid;
}
.app {
  position : relative;
  min-height : 100vh;
}
.content-wrap {
  width : 100%;
  min-height : 60em;
}
</style>
