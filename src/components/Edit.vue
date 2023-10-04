<template>
    <h2>Editar post</h2>
    <form v-on:submit.prevent="editPostMethod">
        <input type="text" id="title" required v-model="title">
        <label for="title">Título</label>
        <input type="text" id="content" required v-model="content">
        <label for="content">Contenido</label>
        <button type="submit">Actualizar</button>
    </form>
</template>
<script>
    export default{
        data(){
            return {
                title: '',
                content: ''
            }
        },
        computed:{
            token(){
                return this.$store.getters.getToken;
            },
            post(){
                return this.$store.getters.getPost;
            }
        },
        async mounted(){
            const paramsR={creationDate: this.$route.params.creationDate, urlSlug: this.$route.params.urlSlug};
            await this.$store.dispatch('getPost', paramsR);
        },
        watch:{
            post(newVal){
                this.title= newVal.title,
                this.content= newVal.content
            }
        },
        methods:{
            async editPostMethod(){
                const payload={
                    token: this.token,
                    id: this.post.id,
                    postObj:{
                        title: this.title,
                        content: this.content
                    }
                }
                await this.$store.dispatch('updatePost',payload);
                this.$router.push('/');
            }
        }
    }
</script>