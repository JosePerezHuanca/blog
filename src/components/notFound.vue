<template>
    <div class="not-found">
        <h2>Error 404</h2>
        <p>
            La página que estás buscando no existe.
        </p>
        <router-link to="/">Volver al inicio</router-link>
    </div>
</template>
<style scoped>
    .not-found {
        text-align: center;
        padding: 20px;
    }

    h2 {
        font-size: 2rem;
        color: #ff3333; /* Color rojo para indicar un error */
    }

    p {
        font-size: 1.2rem;
        margin-top: 10px;
    }

    router-link {
        display: inline-block;
        margin-top: 20px;
        font-size: 1.2rem;
        color: #007aff; /* Color azul para el enlace */
        text-decoration: underline;
        cursor: pointer;
    }

    /* Estilo para cuando el enlace está enfocado (por accesibilidad) */
    router-link:focus {
        outline: none;
    }
</style>