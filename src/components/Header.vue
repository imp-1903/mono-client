<template>
    <header class="columns">
        <p class="column logo">Mono</p>
        <div class="columns column is-two-thirds">
            <div class="column">
                <a class="nav-element" @click="logout">Logout</a>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Content',
    methods: {
        logout() {
            this.$auth.logout()
            this.$router.push('/auth')
        }
    }
}
</script>
