<template>
    <section class="hero is-dark is-mono-bold">
        <!-- Hero head: will stick at the top -->
        <div class="hero-head">
            <nav class="navbar">
                <div class="container">
                    <div class="navbar-brand">
                        <div class="navbar-item">
                            <h1 class="title">Mono</h1>
                        </div>
                        <a role="button" class="navbar-burger" @click="switch_navbar()" aria-label="menu" aria-expanded="false">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div :class="navbar">
                        <div class="navbar-end">
                            <span class="navbar-item">
                                <a class="button is-white is-outlined" @click="logout">
                                    <span>Logout</span>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

        <!-- Hero content: will be in the middle -->
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">Hello, Mr. {{name}}</h1>
                <h2 class="subtitle">get in-depth information about your bank account here</h2>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Content",
    props: ['name'],
    data() {
        return {
            is_active: false
        };
    },
    methods: {
        logout() {
            this.$auth.logout();
            this.$router.push("/auth");
        },
        switch_navbar() {
            this.is_active = !this.is_active;
        }
    },
    computed: {
        navbar() {
            return this.is_active ? "navbar-menu is-active" : "navbar-menu";
        }
    }
};
</script>
