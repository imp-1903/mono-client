<template>
    <div class="auth-page">
        <div class="block">
            <div class="header">
                Write your auth token
            </div>
            <div class="content">
                <p>You can take your auth token here:
                    <a href="https://api.monobank.ua/" target="_blank">https://api.monobank.ua/</a>
                </p>
                <b-field label="Token:">
                    <b-input placeholder="uFoidieakuCneBbPsXK_4h5UVKURLC67fgQ0tihqUYcc" v-model="token"></b-input>
                </b-field>
                <b-button type="is-info" @click="autorize">Login</b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Auth',
    data() {
        return {
            token: ''
        }
    },
    methods: {
        autorize() {
            this.$auth.login(this.token, (data, error) => {
                window.console.log(data)
                if (error) {
                    this.$buefy.toast.open({
                        message: 'Something went wrong :(',
                        type: 'is-danger'
                    })
                } else {
                    this.$store.state.user_data = data.data
                    this.$buefy.toast.open({
                        message: 'Successfull login',
                        type: 'is-success'
                    })
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>
