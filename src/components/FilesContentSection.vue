<template>
    <v-card class="pa-5 mb-5">
        <v-card-title v-text="'Files content'"></v-card-title>
        <v-row>
            <v-col cols="12">
                <v-textarea
                        name="input-1-1"
                        label="Enter .object file content"
                        hint=".object file content"
                        v-model="objectFileContent"
                        v-on:change="convertObjectFile2Json"></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-textarea
                        name="input-2-1"
                        label="Enter dictionary file content"
                        hint="dictionary file content"
                        v-model="dictionaryFileContent"
                        v-on:change="convertDictionaryFile2Json"></v-textarea>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        name: "FilesContent",
        props: [
            'fieldsFromDictionaryFile', 'dicFields',
            'updateFieldsFromDictionaryFile', 'updateDicFields', 'updateSelfDicFields', 'updatePlainDicFields', 'updateInitializedPlainDicFields'
        ],
        data() {
            return {
                //содержимое .object и словаря
                objectFileContent: objectFileContentConst,
                dictionaryFileContent: dictionaryFileContentConst
            }
        },
        updated() {
            this.$nextTick(function () {
                this.convertObjectFile2Json()
                this.convertDictionaryFile2Json()
            })
        },
        methods: {
            convertObjectFile2Json() {
                // this.updateFieldsFromObjectFile([])
                // this.updateDicFields([])
                this.updateSelfDicFields([])
                this.updatePlainDicFields([])
                let x2js = new X2JS();
                let fieldsFromObjectFileBuf = x2js.xml_str2json(this.objectFileContent).CustomObject.fields
                let dicFieldsBuf = []
                fieldsFromObjectFileBuf.forEach(f => {
                    switch (f.type) {
                        case fieldTypes.AUTO_NUMBER:
                        case fieldTypes.DATE:
                        case fieldTypes.DATE_TIME:
                        case fieldTypes.NUMBER:
                        case fieldTypes.TEXT:
                        case fieldTypes.TEXTAREA:
                        case fieldTypes.TEXTAREA_LONG:
                        case fieldTypes.TEXTAREA_RICH:
                        case fieldTypes.TIME:
                            dicFieldsBuf.push(f)
                            break;
                        default:
                            break;
                    }
                })
                this.updateDicFields(dicFieldsBuf.slice())
                this.updateFieldsFromDictionaryFile(fieldsFromObjectFileBuf.slice())
                this.convertDictionaryFile2Json()
            },
            convertDictionaryFile2Json() {
                this.updateFieldsFromDictionaryFile(null)
                this.updateSelfDicFields([])
                if (this.dictionaryFileContent) {
                    this.updateFieldsFromDictionaryFile(JSON.parse(this.dictionaryFileContent))
                    if (this.dicFields) {
                        let plainDicFieldsBuf = []
                        this.dicFields.forEach(f => {
                            if (f.fullName.endsWith("__c")) {
                                if (this.fieldsFromDictionaryFile[f.fullName.substr(0, f.fullName.length - 3)]) {
                                    plainDicFieldsBuf.push(f)
                                }
                            }
                        })
                        this.updatePlainDicFields(plainDicFieldsBuf.slice())
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
