<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    computed: {
        isLogged() {
            return this.$auth.isLogged()
        }
    },
    methods: {
        setTitle() {
            if (!this.$auth.isLogged() && this.$route.path !== '/auth') {
                this.$router.push('/auth')
            }
            document.title = this.$route.name
        }
    },
    mounted() {
        this.setTitle()
    },
    beforeUpdate() {
        this.setTitle()
    }
}
</script>
