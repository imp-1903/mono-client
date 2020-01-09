<template>
  <div>
    <Header :name="name" />
    <section class="section">
      <div class="container">
        <div class="columns">
          <div
            class="column is-3"
            v-for="card in accounts"
            :key="card.id"
            @click="getStatement(card.id)"
          >
            <div class="card is-roundedshit">
              <header class="card-header is-mono-bold">
                <p class="card-header-title has-text-white">{{card.id}}</p>
              </header>
              <div class="card-content">
                <div class="content">
                  <strong>Balance:</strong>
                  {{ card.balance / 100 }} {{ getCurrency(card.currencyCode) }}
                  <br />
                  <strong>Credit limit:</strong>
                  {{ card.creditLimit / 100 }} {{ getCurrency(card.currencyCode) }}
                  <br />
                  <strong>Cashback type:</strong>
                  {{ card.cashbackType }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="box">
          <b-table :data="statement" :columns="statement_columns" striped mobile-cards />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: { Header },
  data() {
    return {
      statement: [],
      statement_columns: [
        {
          field: "id",
          label: "ID",
          numeric: true
        },
        {
          field: "date",
          label: "Date"
        },
        {
          field: "description",
          label: "Description"
        },
        {
          field: "mcc",
          label: "MCC",
          numeric: true
        },
        {
          field: "amount",
          label: "Amount",
          numeric: true
        },
        {
          field: "currencyCode",
          label: "Currency"
        },
        {
          field: "commissionRate",
          label: "Commission",
          numeric: true,
          width: "50"
        },
        {
          field: "cashbackAmount",
          label: "Cashback",
          numeric: true
        },
        {
          field: "balance",
          label: "Balance",
          numeric: true
        },
        {
          field: "hold",
          label: "Hold"
        }
      ]
    };
  },
  computed: {
    userData() {
      if (this.$store.state.user_data) {
        return this.$store.state.user_data;
      } else {
        return this.$auth.getUserData();
      }
    },
    name() {
      if (this.userData) {
        return this.userData.name;
      } else {
        return "no data";
      }
    },
    accounts() {
      if (this.userData) {
        return this.userData.accounts;
      } else {
        return [];
      }
    }
  },
  methods: {
    save() {
      this.$store.state.token = this.token;
      this.$buefy.toast.open({
        message: "Correctly save",
        type: "is-success"
      });
    },
    cancel() {
      this.token = this.$store.state.token;
    },
    getCurrency(code) {
      switch (code) {
        case 980:
          return "UAH";
        case 978:
          return "EUR";
        default:
          return "USD";
      }
    },
    getStatement(account = 0, from = this.getMonthAgo(), to = "") {
      this.$axios
        .get(`/personal/statement/${account}/${from}/${to}`, {
          headers: {
            "X-Token": this.$cookies.get("token")
          }
        })
        .then(response => {
          window.console.log(response);
          this.statement = response.data.map(transaction => {
            return {
              id: transaction.id,
              date: new Date(transaction.time * 1000).toLocaleString(),
              description: transaction.description,
              mcc: transaction.mcc,
              amount: transaction.amount / 100,
              currencyCode: this.getCurrency(transaction.currencyCode),
              commissionRate: transaction.commissionRate / 100,
              cashbackAmount: transaction.cashbackAmount / 100,
              balance: transaction.balance / 100,
              hold: transaction.hold
            };
          });
        })
        .catch(error => {
          window.console.log(error);
          this.$buefy.toast.open({
            message: "Something went wrong",
            type: "is-danger"
          });
        });
    },
    getMonthAgo(date = new Date()) {
      return date.setMonth(date.getMonth() - 1);
    }
  },
  mounted() {
    this.getStatement();
  }
};
</script>
