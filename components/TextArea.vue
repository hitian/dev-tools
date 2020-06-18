<template>
  <div class="ml-3 mr-3">
    <div class="row">
      <textarea 
        v-bind:value="value" 
        v-on:input="$emit('input', $event.target.value)" 
        ref="input_textarea"
        :readonly="readonly"
        class="form-control" cols="30" rows="10"></textarea>
    </div>
    <div class="text-right mt-2">
        <button @click="selectAll" class="btn btn-primary">Select All</button>
        <button @click="copyAll" class="btn btn-primary ml-2">Copy All</button>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
    props: ["value", "readonly"],
    methods: {
        selectAll() {
            this.$refs.input_textarea.select()
        },
        copyAll() {
            let resultBox = this.$refs.input_textarea;
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
        }
    },
}
</script>