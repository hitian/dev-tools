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
                <button @click="show" class="btn btn-primary">Pretty</button>
            </div>
        </div>
        <p>
            <vue-json-pretty
                :data="jsonSource">
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
