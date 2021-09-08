<template>
    <div>
        <h5>JSON Tree View</h5>
        <div class="form">
            <div class="form-group">
                <text-area v-model="input"></text-area>
            </div>
        </div>
        <b-alert variant="warning" show v-if="errMessage!=''" >{{ errMessage }}</b-alert>
        <p>
            <vue-json-pretty
                :data="inputJson">
            </vue-json-pretty>
        </p>
    </div>
</template>
<script>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css';
import TextArea from '~/components/TextArea.vue'
export default {
    data() {
        return {
            input: "{}",
            jsonSource: "{}",
            errMessage: "",
        }
    },
    head () {
        return {
            title: "JSON Tree View",
            meta: [
                { hid: 'description', name: 'description', content: 'JSON string format' }
            ]
        }
    },
    components: {
        VueJsonPretty, TextArea
    },
    computed: {
        inputJson() {
            if (this.input.length == "") {
                return ""
            }
            var json;
            try {
                json = JSON.parse(this.input);
            } catch(e) {
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
        }
    }
}
</script>
