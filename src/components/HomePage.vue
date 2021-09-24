<template>
    <v-app>
        <v-container>
            <FilesContentSection
                    :fieldsFromDictionaryFile="fieldsFromDictionaryFile"
                    :dicFields="dicFields"
                    :updateFieldsFromDictionaryFile="updateFieldsFromDictionaryFile"
                    :updateDicFields="updateDicFields"
                    :updateSelfDicFields="updateSelfDicFields"
                    :updatePlainDicFields="updatePlainDicFields"
            ></FilesContentSection>

            <RequiredFieldsSection
                    :availableFields="availableFields"
                    :dicFields="dicFields"
                    :master="master"
                    :updateMasterField="updateMasterField"
            ></RequiredFieldsSection>

            <v-card class="pa-5 mb-5">
                <v-card-title v-text="'Dictionaries'"></v-card-title>
                <v-row>
                    <v-col cols="6">
                        <label class="typo__label">SELF Dictionary Fields</label>
                        <multiselect
                                v-model="selfDicFields"
                                tag-placeholder="Add this as SELF dictionary field"
                                placeholder="Search a SELF dictionary field"
                                label="label"
                                track-by="fullName"
                                :options="this.availableFields"
                                :multiple="true"
                        ></multiselect>

                        <v-list :two-line="true" :subheader="true" :nav="true">
                            <v-list-item class="mx-auto ma-auto" style="height: 50px;"
                                         v-for="f in selfDicFields"
                                         :key="f.fullName"
                            >
                                <v-list-item-content>
                                    <v-list-item-title v-text="f.fullName"></v-list-item-title>
                                    <v-list-item-subtitle v-if="f.label" v-text="f.label"/>
                                </v-list-item-content>
                                <v-text-field v-model="f.explanation" placeholder="Enter description"></v-text-field>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col cols="6">
                        <div>
                            <label class="typo__label">PLAIN Dictionary Fields</label>
                            <multiselect
                                    v-model="plainDicFields"
                                    tag-placeholder="Add this as PLAIN dictionary field"
                                    placeholder="Search a PLAIN dictionary field"
                                    label="label"
                                    track-by="fullName"
                                    :options="this.availableFields"
                                    :multiple="true"
                            ></multiselect>
                        </div>
                    </v-col>
                </v-row>
            </v-card>

            <v-row>
                <v-col cols="6">
                    <v-btn v-text="'Copy object json source.dictionaries section'"
                           @click="copySourceDictionariesSection"></v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn v-text="'Collect json file for Object'"
                           @click="collectJsonFile"></v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>


<script>
    import Multiselect from 'vue-multiselect'
    import FilesContentSection from "@/components/FilesContentSection";
    import RequiredFieldsSection from "@/components/RequiredFieldsSection";

    export default {
        name: 'AppHome',
        components: {FilesContentSection, RequiredFieldsSection, Multiselect},
        data() {
            return {
                //поля из .object и словаря
                fieldsFromObjectFile: [],
                fieldsFromDictionaryFile: [],
                //используемые поля
                dicFields: [],
                //выбранные поля
                selfDicFields: [],
                plainDicFields: [],
                otherPickedFields: [],

                master: {
                    isHaveProducts: true,
                    products: [],
                    isHaveDisappearanceTime: true,
                    disappearanceTime: 'disappearanceTime__c',
                    isHaveAccount: true,
                    account: {
                        dimensionType: '',
                        accountField: ''
                    },
                    isHaveKeyFields: true,
                    keyFields: [],
                    isHaveLookups: true,
                    lookups: [],
                    source: {
                        dictionaries: [
                            {
                                type: "self",
                                fieldMap: {}
                            },
                            {
                                type: "plain",
                                referenceTypeDocUrl: "",
                                referenceCallDocUrl: "",
                                location: "",
                                fieldMap: {}
                            }
                        ]
                    }
                }
            }
        },
        computed: {
            availableFields() {
                let avlblFields = []
                this.dicFields.forEach(f => {
                    if (!this.selfDicFields.includes(f) && !this.plainDicFields.includes(f) && !this.otherPickedFields.includes(f)) {
                        avlblFields.push(f)
                    }
                })
                return avlblFields
            }
        },
        methods: {
            updateFieldsFromObjectFile(fields) {
                this.fieldsFromObjectFile = fields.slice()
            },
            updateFieldsFromDictionaryFile(fields) {
                this.fieldsFromDictionaryFile = fields
            },
            updateDicFields(fields) {
                this.dicFields = fields.slice()
            },
            updateSelfDicFields(fields) {
                this.selfDicFields = fields.slice()
            },
            updatePlainDicFields(fields) {
                this.plainDicFields = fields.slice()
            },
            updateMasterField(fieldName, value) {
                this.master[fieldName] = value
            },
            copySourceDictionariesSection() {
                this.selfDicFields.forEach(f => {
                    this.master.source.dictionaries[0].fieldMap[f.fullName] = {
                        "explanation": f.explanation ? f.explanation : ''
                    }
                })
                this.plainDicFields.forEach(f => {
                    this.master.source.dictionaries[1].fieldMap[f.fullName] = {
                        "path": f.fullName.substr(0, f.fullName.length - 3)
                    }
                })

                window.prompt("Copy to clipboard: Ctrl+C, Enter", JSON.stringify(this.master.source))
            },
            collectJsonFile() {
                let jsonMaster = {
                    subentities: {
                        Master: {}
                    }
                }

                if (this.master.isHaveProducts)
                    jsonMaster.subentities.Master['products'] = this.master.products
                if (this.master.isHaveDisappearanceTime)
                    jsonMaster.subentities.Master['disappearanceTime'] = this.master.disappearanceTime
                if (this.master.isHaveKeyFields)
                    jsonMaster.subentities.Master['keyFields'] = this.master.keyFields
                if (this.master.isHaveLookups)
                    jsonMaster.subentities.Master['lookups'] = this.master.lookups

                this.selfDicFields.forEach(f => {
                    this.master.source.dictionaries[0].fieldMap[f.fullName] = {
                        "explanation": f.explanation ? f.explanation : ''
                    }
                })
                this.plainDicFields.forEach(f => {
                    this.master.source.dictionaries[1].fieldMap[f.fullName] = {
                        "path": f.fullName.substr(0, f.fullName.length - 3)
                    }
                })
                jsonMaster.subentities.Master.source = this.master.source

                window.prompt("Copy to clipboard: Ctrl+C, Enter", JSON.stringify(jsonMaster))
            }
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
