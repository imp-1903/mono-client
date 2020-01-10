<template>
    <div class="box">
        <b-table :data="data"
                 striped
                 mobile-cards
            >
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>Nothing here</p>
                    </div>
                </section>
            </template>

            <template slot-scope="props">
                <b-table-column field="description" label="Description" :title="props.row.id">
                    {{ props.row.description }}
                </b-table-column>

                <b-table-column field="date" label="Date">
                    {{ props.row.date.toLocaleString() }}
                </b-table-column>

                <b-table-column field="amount"
                                label="Amount"
                                :class="{'has-text-danger': props.row.amount < 0,
                                         'has-text-success': props.row.amount > 0
                                        }">
                    {{ props.row.amount }}
                </b-table-column>

                <b-table-column field="commissionRate"
                                label="Commission"
                                numeric
                                :class="{'has-text-danger': props.row.commissionRate > 0}">
                    {{ props.row.commissionRate }}
                </b-table-column>

                <b-table-column field="cashbackAmount"
                                label="Cashback"
                                numeric
                                :class="{'has-text-success': props.row.cashbackAmount > 0}">
                    {{ props.row.cashbackAmount }}
                </b-table-column>

                <b-table-column field="balance" label="Balance" numeric>
                    {{ props.row.balance }}
                </b-table-column>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    name: "Table",
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            },
            required: true
        }
    }
}
</script>
