<template>
    <div>
        <h5>JSON Tree View</h5>
        <div class="form">
            <div class="form-group">
                <text-area v-model="input"></text-area>
                <p class="help-block alert alert-warning" v-if="message">
                    {{message}}
                </p>
            </div>
            <div class="form-group">
                Deep: <input type="text" v-model="jsonShowDeep" />
            </div>
        </div>
        <p>
            <vue-json-pretty
                :data="inputJson"
                :deep="jsonShowDeep">
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
            message: "",
            jsonShowDeep: 1,
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
                return ""
            }
            return json
        }
    },
    methods: {
        show() {
            if (this.input.length == "") {
                this.showMessage("input empty");
            }
            var json;
            try {
                json = JSON.parse(this.input);
            } catch(e) {
                this.showMessage("json data error.");
                return
            }
            this.input = JSON.stringify(json);
            this.jsonSource = json;
        },
        showMessage(message) {
            this.message = message;
            setTimeout(() => {
                this.message = "";
            }, 5000);
        },
        selectAll(event) {
            event.target.select();
        }
    }
}
</script>
