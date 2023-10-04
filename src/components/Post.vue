<template>
    <div v-if="post && post.user" class="post">
        <h2 class="post-title">{{ post.title }}</h2>
        <div class="post-details">
            <ul>
                <li class="post-date">Fecha: <time>{{  post.creationDate }} {{ formatRelativeDate(post.creationDate) }}</time></li>
                <li>Autor: {{ post.user.userName }}</li>
            </ul>
        </div>
        <p class="post-content">{{ post.content }}</p>
    </div>
</template>
<script>
import moment from 'moment';
    export default{
        computed:{
            post(){
                return this.$store.getters.getPost;
            }
        },
        methods:{
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
            const payload={
                creationDate: this.$route.params.creationDate,
                urlSlug: this.$route.params.urlSlug
            }
            await this.$store.dispatch('getPost',payload);
        }
    }
</script>
<style scoped>
    .post {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }

    .post-title {
        font-size: 1.5rem;
        margin: 0;
    }

    .post-details {
        font-size: 0.9rem;
        color: #888;
    }

    .post-date {
        margin-bottom: 10px;
    }

    .post-content {
        margin-top: 20px;
        line-height: 1.6;
    }
</style>