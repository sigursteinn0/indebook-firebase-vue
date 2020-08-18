<template>
    <div class="login-wrap">
        <div class="container" v-if="login.loggedIn">
            <button @click="$emit('logout-event')" class="logout-button">Logout</button>
            <p> {{ login.username }} </p>
        </div>
        <div class="container" v-else> 
            <input v-model="username" type="text" class="form-input" placeholder="Username">
            <input v-model="password" type="password" class="form-input" placeholder="Password">
            <button @click="clear()" class="login-button">Login</button>
            <p v-if="login.attempt"> Login failed </p>
            <input v-model="usernameR" type="text" class="form-input" placeholder="Username">
            <input v-model="passwordR" type="password" class="form-input" placeholder="Password">
            <button @click="clearR()" class="register-button">Register</button>
        </div>
    </div>
</template>

<script>
export default {
    name : 'LoginHeaderComponent',
    props : ['login', 'loading'],
    data() {
        return {
            username : '',
            password : '',
            usernameR : '',
            passwordR : ''
        }
    },
    methods : {
        clear() {
            this.$emit('login-event', this.username, this.password)
            this.username = '';
            this.password = '';
        },
        clearR() {
            this.$emit('register-event', this.usernameR, this.passwordR)
            this.usernameR = '';
            this.passwordR = '';
        }
    }
}
</script>

<style scoped>
    input[type="text"] {
        color: #592848;
    }
    input[type="password"] {
        color: #123456;
    }
    button {
        position: sticky;
        height : 3em;
        margin : 0.6em;
    }

    .form-input {
        margin: 1em 0.5em;
    }
    .login-wrap {
        background-color : #80d0ff;
    }
</style>