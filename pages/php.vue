<template>
    <div>
        <h5>PHP Serialize</h5>
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
var unserialize = require('locutus/php/var/unserialize');
var serialize = require('locutus/php/var/serialize');
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

            let input = this.input;
            if (input.startsWith('"') && input.endsWith('"') && input.indexOf('\"') != -1) {
                input = eval(input);
            }
            console.log(input);

            let result = unserialize(input);
            if (result) {
                this.output = JSON.stringify(result);
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
