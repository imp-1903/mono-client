<template>
    <div>
        <Header :name="name" />
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-3"
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
                <b-tabs>
                    <b-tab-item label="Charts">
                        <Charts :data="statement"></Charts>
                    </b-tab-item>
                    <b-tab-item label="Table">
                        <Table :data="statement"></Table>
                    </b-tab-item>
                </b-tabs>
            </div>
        </section>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Charts from '@/components/Charts.vue'
import Table  from '@/components/Table.vue'

export default {
    name: 'Home',
    components: {
        Header,
        Table,
        Charts
    },
    data() {
        return {
            statement: []
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
            return this.userData ? this.userData.name : "no data"
        },
        accounts() {
            return this.userData ? this.userData.accounts : []
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
                return 'UAH'
                case 978:
                return 'EUR'
                case 840:
                return 'USD'
                case 643:
                return 'RUB'
                case 985:
                return 'PLN'
                default:
                return 'unknown currency: ' + code
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
                        date: new Date(transaction.time * 1000),
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
