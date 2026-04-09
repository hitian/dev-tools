<template>
  <div class="space-y-6">
    <VaCard>
      <VaCardContent>
        <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Input</div>
        <VaTextarea
          v-model="input"
          placeholder="Paste or type URL/text here..."
          :min-rows="8"
          autosize
          class="w-full font-mono text-sm mb-4"
        />
        
        <div class="flex gap-3 mb-6">
          <VaButton @click="encode" icon="link">Encode</VaButton>
          <VaButton @click="decode" icon="link_off" preset="secondary">Decode</VaButton>
          <VaButton @click="clear" preset="secondary" border-color="warning">Clear</VaButton>
        </div>

        <VaAlert v-if="message" color="danger" dense class="mb-4">
          {{ message }}
        </VaAlert>

        <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 mt-8">Output</div>
        <VaTextarea
          v-model="output"
          readonly
          placeholder="Result will appear here..."
          :min-rows="8"
          autosize
          class="w-full font-mono text-sm"
        />
        <div class="mt-4 flex justify-end" v-if="output">
          <VaButton size="small" preset="secondary" icon="content_copy" @click="copyToClipboard(output)">Copy Output</VaButton>
        </div>
      </VaCardContent>
    </VaCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      input: "",
      output: "",
    }
  },
  methods: {
    encode() {
      if (!this.input) {
        this.showMessage("Input is empty");
        return;
      }
      try {
        this.output = encodeURIComponent(this.input);
      } catch (e) {
        this.showMessage("Encode failed: " + e.message);
      }
    },
    decode() {
      if (!this.input) {
        this.showMessage("Input is empty");
        return;
      }
      try {
        this.output = decodeURIComponent(this.input);
      } catch (e) {
        this.showMessage("Decode failed: " + e.message);
      }
    },
    clear() {
      this.input = "";
      this.output = "";
      this.message = "";
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.$vaToast.init({
          message: 'Copied to clipboard!',
          color: 'success',
          duration: 2000
        });
      });
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

<style scoped>
</style>
