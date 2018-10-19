<template>
    <div>
        <h5>PHP Serialize</h5>
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
var unserialize = require('locutus/php/var/unserialize');
var serialize = require('locutus/php/var/serialize');
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
            title: "PHP serialize & unserialize",
            meta: [
                { hid: 'description', name: 'description', content: 'PHP serialize & unserialize' }
            ]
        }
    },
    methods: {
        encode() {
            if (this.input.length == "") {
                this.showMessage("input empty");
            }
            this.message = "";
            var json;
            try {
                json = JSON.parse(this.input);
            } catch(e) {
                this.showMessage("json data error.");
                return
            }

            let result = serialize(json);
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
            this.message = "";
            let input = this.input;
            if (input.startsWith('"') && input.endsWith('"') && input.indexOf('\"') != -1) {
                input = eval(input);
            }
            console.log(input);
            try {
                let result = unserialize(input);
                if (result) {
                    this.output = JSON.stringify(result);
                    return;
                } else {
                    this.showMessage("decode failed.");
                }
            }catch(e){
                this.showMessage("decode failed:" + e);
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
