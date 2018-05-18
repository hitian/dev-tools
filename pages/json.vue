<template>
    <div>
        <h5>JSON Tree View</h5>
        <div class="form">
            <div class="form-group">
                <textarea class="form-control" v-on:dblclick="selectAll" v-model="input" placeholder="input here" cols="30" rows="10"></textarea>
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
//import Vue from 'vue'
import VueJsonPretty from 'vue-json-pretty'
// Vue.use(JsonTreeView);
export default {
    data() {
        return {
            input: "{}",
            jsonSource: "{}",
            message: "",
        }
    },
    components: {
        VueJsonPretty
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
