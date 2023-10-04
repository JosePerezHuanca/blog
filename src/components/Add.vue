<template>
    <h2>Crear post</h2>
    <form v-on:submit.prevent="createPostMethod">
        <input type="text" id="title" required v-model="title">
        <label for="title">Título</label>
        <input type="text" id="content" required v-model="content">
        <label for="content">Contenido</label>
        <button type="submit">Publicar</button>
    </form>
</template>
<script>
export default {
    computed:{
        token(){
            return this.$store.getters.getToken;
        }
    },
    data(){
        return{
            title: '',
            content: ''
        }
    },
    methods:{
        createPostMethod(){
            const payload={
                token: this.token,
                postObj:{
                    title: this.title,
                    content: this.content
                }
            }
            this.$store.dispatch('createPost', payload);
            
        }
    }
}
</script>