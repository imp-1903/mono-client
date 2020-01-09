<template>
  <div class="container">
    <hr />
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Login</h1>
        <div class="card is-roundedshit">
          <header class="card-header is-mono-bold">
            <p class="card-header-title has-text-white">Write your auth token</p>
          </header>
          <div class="card-content">
            <div class="content">
              <b-field label="Token:">
                <b-input
                  placeholder="uFoidieakuCneBbPsXK_4h5UVKURLC67fgQ0tihqUYcc"
                  v-model="token"
                />
              </b-field>
              <b-button type="is-mono-bold has-text-white" @click="autorize">Login</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      token: "uJiT18TzG7DkNL1LZ7XV4NUgWivu_gZFNNinKRPGe9g0"
    };
  },
  methods: {
    autorize() {
      this.$auth.login(this.token, (data, error) => {
        window.console.log(data);
        if (error) {
          this.$buefy.toast.open({
            message: "Something went wrong :(",
            type: "is-danger"
          });
        } else {
          this.$store.state.user_data = data.data;
          this.$buefy.toast.open({
            message: "Successfull login",
            type: "is-success"
          });
          this.$router.push("/");
        }
      });
    }
  }
};
</script>
