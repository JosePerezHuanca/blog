<template>
<h2>Registrarse</h2>
<form v-on:submit.prevent="signupMethod">
    <input type="text" id="uName" required v-model="username">
    <label for="uName">Nombre de usuario</label>
    <input type="password" id="passw" required v-model="password">
    <label for="passw">Contraseña</label>
    <input type="password" id="passw2" required v-model="password2">
    <label for="passw2">Repite la contraseña</label>
    <button type="submit">Registrar</button>
</form>
</template>
<script>
    export default{
        data(){
            return {
                username: '',
                password: '',
                password2: ''
            }
        },
        methods:{
            signupMethod(){
                this.$store.dispatch('signupAction',{
                    userName: this.username,
                    password: this.password,
                    passwordR: this.password2
                })
                //.then(()=> this.$router.push('/'))
            }
        }
    }
</script>