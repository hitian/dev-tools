<template>
    <div>
        <h5>Base64</h5>
        <div class="form">
            <div class="form-group">
                <textarea class="form-control" v-on:dblclick="selectAll" v-model="input" placeholder="input here" cols="30" rows="10"></textarea>
            </div>
            <div class="form-group">
                <button @click="decode" class="btn btn-primary">decode</button>
                <button @click="encode" class="btn btn-warning ml-5">encode</button>
                <span v-if="message" class="badge badge-warning ml-3">{{message}}</span>
                <span v-if="copy_success" class="badge badge-success ml-3">result copied to clipboard</span>
            </div>
            <div class="form-group">
                <textarea class="form-control" @click="copyResult" v-model="output" placeholder="result here" cols="30" readonly rows="15"></textarea>
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
            output: "",
            copy_success: false,
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
        },
        showCopySuccess() {
            this.copy_success = true;
            setTimeout(() => {
                this.copy_success = false;
            }, 5000);
        },
        copyResult(event) {
            let resultBox = event.target;
            resultBox.focus();
            resultBox.select();
            try {
                var isCopySuccess = document.execCommand('copy');
                if (isCopySuccess) {
                    this.showCopySuccess();
                    return;
                }
            } catch(err) {  
                console.log('Oops, unable to copy: ' + err);  
            }
        },
        selectAll(event) {
            event.target.select();
        }
    }
}
</script>
