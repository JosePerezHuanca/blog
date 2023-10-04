<template>
  <nav>
    <router-link to="/">Inicio</router-link> |
    <router-link v-if="token" to="/add">Crear post</router-link> |
    <a v-if="token" @click="logoutMethod">Cerrar sesión</a>
  </nav>
  <h1>Blog</h1>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
  export default{
    computed:{
      token(){
        return this.$store.getters.getToken;
      }
    },
    methods:{
      logoutMethod(){
        this.$store.dispatch('logoutAction');
        this.$router.push('/');
      }
    }
  }
</script>

