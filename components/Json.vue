<template>
    <VaCard>
        <VaCardTitle>JSON Tree View</VaCardTitle>
        <VaCardContent>
            <VaTextarea v-model="input" style="width: 100%;" minRows="10" placeholder="input here" autosize />
            <div style="margin-top: 10px;text-align: left;">
                <VaButton @click="minify">
                    minify
                </VaButton>
            </div>
            <VaAlert color="danger" v-if="errMessage" :description="errMessage" />
            <p>
                <vue-json-pretty :data="inputJson">
                </vue-json-pretty>
            </p>
        </VaCardContent>
    </VaCard>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css';
export default {
    components: {
        VueJsonPretty
    },
    data() {
        return {
            input: "{}",
            jsonSource: "{}",
            errMessage: "",
        }
    },
    computed: {
        inputJson() {
            if (this.input.length == "") {
                return ""
            }
            var json;
            try {
                this.input = this.input.replaceAll("\n", "")
                json = JSON.parse(this.input);
            } catch (e) {
                this.errMessage = e
                return ""
            }
            this.errMessage = ""
            return json
        }
    },
    methods: {
        selectAll(event) {
            event.target.select();
        },
        minify() {
            try {
                this.input = JSON.stringify(JSON.parse(this.input))
            } catch (error) {
                this.errMessage = error
            }
        }
    }
}
</script>