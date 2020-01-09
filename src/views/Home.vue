<template>
    <div class="home">
        <div class="text-block">
            <strong>Your name is:</strong>
            {{ name }}
            <br>
            <strong>Current token:</strong>
            {{ $cookies.get('token') }}
        </div>
        <div class="cards">
            <div class="card" v-for="card in accounts" :key="card.id" @click="getStatement(card.id)">
                <p class="id">{{ card.id }}</p>
                <div class="card-info">
                    <p><strong>Balance:</strong> {{ card.balance / 100 }} {{ getCurrency(card.currencyCode) }}</p>
                    <p><strong>Credit limit:</strong> {{ card.creditLimit / 100 }} {{ getCurrency(card.currencyCode) }}</p>
                    <p><strong>Cashback type:</strong> {{ card.cashbackType }}</p>
                </div>
            </div>
        </div>
        <hr>
        <b-table :data="statement"
                 :columns="statement_columns"
                 striped
                 mobile-cards
                 >
        </b-table>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            statement: [],
            statement_columns: [
                {
                    field: 'id',
                    label: 'ID',
                    numeric: true
                },
                {
                    field: 'date',
                    label: 'Date'
                },
                {
                    field: 'description',
                    label: 'Description'
                },
                {
                    field: 'mcc',
                    label: 'MCC',
                    numeric: true
                },
                {
                    field: 'amount',
                    label: 'Amount',
                    numeric: true
                },
                {
                    field: 'currencyCode',
                    label: 'Currency code'
                },
                {
                    field: 'commissionRate',
                    label: 'Commission',
                    numeric: true,
                    width: '50'
                },
                {
                    field: 'cashbackAmount',
                    label: 'Cashback',
                    numeric: true
                },
                {
                    field: 'balance',
                    label: 'Balance',
                    numeric: true
                },
                {
                    field: 'hold',
                    label: 'Hold'
                }
            ]
        }
    },
    computed: {
        userData() {
            if (this.$store.state.user_data) {
                return this.$store.state.user_data
            } else {
                return this.$auth.getUserData()
            }
        },
        name() {
            if (this.userData) {
                return this.userData.name
            } else {
                return 'no data'
            }
        },
        accounts() {
            if (this.userData) {
                return this.userData.accounts
            } else {
                return []
            }
        }
    },
    methods: {
        save() {
            this.$store.state.token = this.token
            this.$buefy.toast.open({
                message: 'Correctly save',
                type: 'is-success'
            })
        },
        cancel() {
            this.token = this.$store.state.token
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
        getStatement(account = 0, from = this.getMonthAgo(), to = '') {
            this.$axios.get(`/personal/statement/${ account }/${ from }/${ to }`, {
                'headers': {
                    'X-Token': this.$cookies.get('token')
                }
            }).then((response) => {
                window.console.log(response)
                this.statement = response.data.map((transaction) => {
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
                    }
                })
            }).catch((error) => {
                window.console.log(error)
                this.$buefy.toast.open({
                    message: 'Something went wrong',
                    type: 'is-danger'
                })
            })
        },
        getMonthAgo(date = new Date) {
            return date.setMonth(date.getMonth() - 1)
        }
    },
    mounted() {
        this.getStatement()
    }
}
</script>
