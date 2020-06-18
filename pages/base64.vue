<template>
    <div>
        <h5>Base64</h5>
        <div class="form">
            <div class="form-group">
                <text-area v-model="input"></text-area>
            </div>
            <div class="form-group">
                <button @click="decode" class="btn btn-primary">decode</button>
                <button @click="encode" class="btn btn-warning ml-2">encode</button>
                <span v-if="message" class="badge badge-warning ml-3">{{message}}</span>
            </div>
            <div class="form-group">
                <text-area v-model="output" readonly="readonly" ></text-area>
            </div>
        </div>
    </div>
</template>
<script>
import TextArea from '~/components/TextArea.vue'
var Base64 = require('js-base64').Base64;
export default {
    components: {
        TextArea
    },
    data() {
        return {
            message: "",
            input: "",
            output: "",
        }
    },
    head () {
        return {
            title: "base64 encode & decode",
            meta: [
                { hid: 'description', name: 'description', content: 'base64 encode & decode' }
            ]
        }
    },
    methods: {
        encode() {
            if (this.input.length == "") {
                this.showMessage("input empty");
            }
            let result = Base64.encode(this.input);
            if (result.length > 0) {
                this.output = result;
            } else {
                this.showMessage("encode failed.");
            }
        },
        decode() {
            if (this.input.length == "") {
                this.showMessage("input empty");
            }
            let result = Base64.decode(this.input);
            if (result.length > 0) {
                this.output = result;
            } else {
                this.showMessage("decode failed.");
            }
        },
        showMessage(message) {
            this.message = message;
            setTimeout(() => {
                this.message = "";
            }, 5000);
        }
    }
}
</script>
