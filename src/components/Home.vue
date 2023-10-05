<template>
    <div class="post-list">
        <h2>Lista de entradas</h2>
        <div v-if="posts" v-for="post in posts" class="post-item">
            <h2><router-link :to="`/${post.creationDate}/${post.urlSlug}`">{{ post.title }}</router-link></h2>
            <div class="post-info">
                <span>publicado por {{ post.user.userName}} </span>
                <time> {{ post.creationDate }} {{ formatRelativeDate(post.creationDate) }}</time>
            </div>
            <router-link :to="`/edit/${post.creationDate}/${post.urlSlug}`" v-if="isAdmin!==null && isAdmin">Editar</router-link>
            <button v-if="isAdmin!==null && isAdmin" @click="removeMethod(post.id)">Borrar</button>
        </div>
        <button @click="prevMethod" :disabled="currentPage === 1">Anterior</button>
        <button @click="nextMethod" :disabled="currentPage >= totalPages">Siguiente</button>
    </div>
</template>
<script>
    import moment from 'moment';
    export default{
        computed:{
            posts(){
                return this.$store.getters.getPosts;
            },
            token(){
                return localStorage.getItem('token');
            },
            isAdmin(){
                return localStorage.getItem('isAdmin');
            },
            currentPage(){
                return this.$store.getters.getCurrentPage;
            },
            results(){
                return this.$store.getters.getResults;
            },
            totalPages(){
                return this.$store.getters.getTotalPages;
            }
        },
        methods:{
            async removeMethod(idParam){
                const payload={
                    id: idParam,
                    token: this.token
                }
                await this.$store.dispatch('deletePost', payload);
                return this.$router.push('/');
            },
            async prevMethod(){
                if(this.currentPage > 1){
                    this.$store.commit('setCurrentPage', this.currentPage - 1);
                    await this.$store.dispatch('getPosts',{page: this.currentPage, results: this.results});
                }
            },
            async nextMethod(){
                if(this.currentPage < this.totalPages){
                    this.$store.commit('setCurrentPage', this.currentPage + 1);
                    await this.$store.dispatch('getPosts',{page: this.currentPage, results: this.results});
                }
            },
            formatRelativeDate(creationDate) {
                const currentDate = moment();
                const postDate = moment(creationDate);
                const yearsDifference = currentDate.diff(postDate, 'years');
                const monthsDifference = currentDate.diff(postDate, 'months');
                const weeksDifference = currentDate.diff(postDate, 'weeks');
                const daysDifference = currentDate.diff(postDate, 'days');
                if (yearsDifference > 0) {
                    return `hace ${yearsDifference} año${yearsDifference > 1 ? 's' : ''}`;
                } 
                else if (monthsDifference > 0) {
                    return `hace ${monthsDifference} mes${monthsDifference > 1 ? 'es' : ''}`;
                } 
                else if (weeksDifference > 0) {
                    return `hace ${weeksDifference} semana${weeksDifference > 1 ? 's' : ''}`;
                }
                else if (daysDifference > 0) {
                    return `Hace ${daysDifference} día${daysDifference > 1 ? 's' : ''}`;
                }
                else {
                    return 'Hoy';
                }
            }
        },
        async created(){
            await this.$store.dispatch('getPosts',{page: this.currentPage, results: this.results});
        }
    }
</script>
<style scoped>
    .post-list {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }

    .post-item {
        border: 1px solid #ccc;
        margin-bottom: 20px;
        padding: 10px;
    }

    h2 {
        font-size: 1.5rem;
        margin: 0;
    }

    .post-info {
        font-size: 0.9rem;
        color: #888;
    }

    time {
        font-size: 0.9rem;
        color: #888;
        margin-left: 10px;
    }

    button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 0.9rem;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
</style>