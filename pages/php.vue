<template>
    <div>
        <h5>PHP Serialize</h5>
        <div class="form">
            <div class="form-group">
                <text-area v-model="input"></text-area>
            </div>
            <div class="form-group">
                <button @click="decode" class="btn btn-primary">decode</button>
                <button @click="encode" class="btn btn-warning ml-5">encode</button>
                <span v-if="message" class="badge badge-warning ml-3">{{message}}</span>
            </div>
            <div class="form-group">
                <text-area v-model="output"></text-area>
            </div>
        </div>
    </div>
</template>
<script>
import TextArea from '~/components/TextArea.vue'
var unserialize = require('locutus/php/var/unserialize');
var serialize = require('locutus/php/var/serialize');
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
        }
    }
}
</script>
