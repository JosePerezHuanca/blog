<template>
    <h2>Acceder</h2>
    <form v-on:submit.prevent="signinMethod">
        <input type="text" id="uName" required v-model="username">
        <label for="uName">Nombre de usuario</label>
        <input type="password" id="passw" required v-model="password">
        <label for="passw">Contraseña</label>
        <button type="submit">Acceder</button>
    </form>
</template>
<script>
    export default{
        data(){
            return{
                username: '',
                password: ''
            }
        },
        methods:{
            signinMethod(){
                this.$store.dispatch('signinAction',{
                    userName: this.username,
                    password: this.password
                })
            }
        }
    }
</script>