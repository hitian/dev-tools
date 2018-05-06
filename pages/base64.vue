<template>
    <div>
        <h5>Base64</h5>
        <div class="form">
            <div class="form-group">
                <textarea class="form-control" v-model="input" placeholder="input here" cols="30" rows="10"></textarea>
                <p class="help-block alert alert-warning" v-if="message">
                    {{message}}
                </p>
            </div>
            <div class="form-group">
                <button @click="decode" class="btn btn-primary">decode</button>
                <button @click="encode" class="btn btn-warning ml-5">encode</button>
                
            </div>
            <div class="form-group">
                <textarea class="form-control" v-model="output" placeholder="result here" cols="30" readonly rows="10"></textarea>
            </div>
        </div>
    </div>
</template>
<script>
var Base64 = require('js-base64').Base64;
export default {
    data() {
        return {
            message: "",
            input: "",
            output: ""
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
