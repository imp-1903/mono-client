<template>
    <div>
        <p class="title has-text-centered">Balance</p>
        <line-chart :chartData="balance"
                    :options="lineOption"
                    ref="chart"
                    v-if="balance"
                    >
        </line-chart>

        <p class="title has-text-centered">Amount</p>
        <line-chart :chartData="amount"
                    :options="lineOption"
                    ref="chart"
                    v-if="amount"
                    >
        </line-chart>

        <p class="title has-text-centered">Cashback</p>
        <line-chart :chartData="cashback"
                    :options="lineOption"
                    ref="chart"
                    v-if="cashback"
                    >
        </line-chart>

        <div class="box" v-if="!data.length">
            <section class="section">
                <div class="content has-text-grey has-text-centered">
                    <p>Nothing here</p>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import LineChart from '@/components/LineChart.js'

export default {
    name: 'Charts',
    components: {
        'line-chart': LineChart
    },
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            lineOption: {
                responsive: true,
                maintainAspectRatio: false,
                hover: {
                    mode: 'index',
                    intersect: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        mode: 'categories',
                        color: '#fff',
                        showTicks: false,
                        gridLines: false
                    }]
                },
                legend: {
                    display: false
                }
            }
        }
    },
    computed: {
        balance() {
            if (this.data.length) {
                return {
                    labels: this.data.map((transaction) => {
                        return transaction.date.toLocaleDateString()
                    }).reverse(),
                    datasets: [{
                        label: 'Balance',
                        backgroundColor: this.gradient(),
                        borderColor: 'rgba(99, 114, 205, 0.5)',
                        data: this.data.map((transaction) => {
                            return transaction.balance
                        }).reverse()
                    }]
                }
            } else {
                return false
            }
        },
        amount() {
            if (this.data.length) {
                return {
                    labels: this.data.map((transaction) => {
                        return transaction.date.toLocaleDateString()
                    }).reverse(),
                    datasets: [{
                        label: 'Amount',
                        backgroundColor: this.gradient(true),
                        borderColor: 'rgba(99, 114, 205, 0.5)',
                        data: this.data.map((transaction) => {
                            return transaction.amount
                        }).reverse()
                    }]
                }
            } else {
                return false
            }
        },
        cashback() {
            if (this.data.length) {
                return {
                    labels: this.data.map((transaction) => {
                        return transaction.date.toLocaleDateString()
                    }).reverse(),
                    datasets: [{
                        label: 'Cashback',
                        backgroundColor: this.gradient(),
                        borderColor: 'rgba(99, 114, 205, 0.5)',
                        data: this.data.map((transaction) => {
                            return transaction.cashbackAmount
                        }).reverse()
                    }]
                }
            } else {
                return false
            }
        }
    },
    methods: {
        gradient(reverse = false) {
            var canvas = document.createElement('canvas')
            var gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

            gradient.addColorStop(+reverse, 'rgba(216, 155, 158, 0.7)');
            gradient.addColorStop(+!reverse, 'rgba(99, 114, 205, 0.7)')

            return gradient
        }
    }
}
</script>
