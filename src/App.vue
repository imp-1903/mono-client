<template>
    <div>
        <div v-if="$route.path != '/auth'">
            <Header></Header>
            <main>
                <router-view></router-view>
            </main>
        </div>
        <div v-else>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
    name: 'app',
    components: {
        Header
    },
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
