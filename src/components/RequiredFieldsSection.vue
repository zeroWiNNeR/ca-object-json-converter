<template>
    <v-card class="pa-5 mb-5">
        <v-card-title v-text="'Required Fields'"></v-card-title>
        <v-row>
            <v-col cols="2">
                <v-checkbox
                        v-model="master.isHaveProducts"
                        :label="`products`"
                ></v-checkbox>
                <v-textarea
                        v-if="master.isHaveProducts"
                        v-model="products"
                        v-on:change="updateMasterProducts"
                ></v-textarea>
            </v-col>
            <v-col cols="2">
                <v-checkbox
                        v-model="master.isHaveDisappearanceTime"
                        :label="`disappearanceTime`"
                ></v-checkbox>
                <v-select
                        v-if="master.isHaveDisappearanceTime"
                        v-model="disappearanceTime"
                        :items="availableFieldsLabels"
                        label="Select"
                        hint="Pick disappearanceTime"
                        persistent-hint
                        v-on:change="updateMasterDisappearanceTime"
                ></v-select>
            </v-col>
            <v-col cols="2">
                <v-checkbox
                        v-model="master.isHaveAccount"
                        :label="`account`"
                ></v-checkbox>
                <v-text-field
                        v-if="master.isHaveAccount"
                        v-model="account.dimensionType"
                        label="Enter dimensionType"
                        v-on:change="updateMasterAccount"
                ></v-text-field>
                <v-text-field
                        v-if="master.isHaveAccount"
                        v-model="account.accountField"
                        label="Enter accountField"
                        v-on:change="updateMasterAccount"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-checkbox
                        v-model="master.isHaveKeyFields"
                        :label="`keyFields`"
                ></v-checkbox>
                <v-select
                        v-model="keyFields"
                        :items="availableFieldsLabels"
                        :menu-props="{ maxHeight: '300' }"
                        label="Select"
                        multiple
                        hint="Pick keyFields"
                        persistent-hint
                        v-on:change="updateMasterKeyFields"
                ></v-select>
            </v-col>
            <v-col cols="4">
                <v-checkbox
                        v-model="master.isHaveLookups"
                        :label="`lookups`"
                ></v-checkbox>
                <v-textarea
                        v-if="master.isHaveLookups"
                        v-model="lookups"
                        v-on:change="updateMasterLookups"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-row>

        </v-row>
    </v-card>
</template>

<script>
    import Multiselect from 'vue-multiselect'

    export default {
        name: "RequiredFieldsSection",
        components: {Multiselect},
        props: [
            'availableFields', 'dicFields', 'master',
            'updateMasterField'
        ],
        data() {
            return {
                products: '',
                account: {
                    dimensionType: '',
                    accountField: ''
                },
                disappearanceTime: '',
                keyFields: [],
                lookups: ''
            }
        },
        computed: {
            availableFieldsLabels() {
                let labels = []
                this.dicFields.forEach(f => labels.push(f.fullName))
                return labels
            }
        },
        methods: {
            updateMasterProducts() {
                this.updateMasterField('products', this.products.split(','))
            },
            updateMasterDisappearanceTime() {
                this.updateMasterField('disappearanceTime', this.disappearanceTime)
            },
            updateMasterAccount() {
                this.updateMasterField('account', this.account)
            },
            updateMasterKeyFields() {
                this.updateMasterField('keyFields', this.keyFields)
            },
            updateMasterLookups() {
                try {
                    this.updateMasterField('lookups', JSON.parse(this.lookups))
                } catch (e) {
                    alert('Error while parsing JSON from `lookups` field: ' + e)
                }
            }
        }
    }
</script>

<style scoped>

</style>
