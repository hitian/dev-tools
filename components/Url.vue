<template>
  <div class="space-y-6">
    <!-- Tool Header -->
    <div class="flex items-center gap-4 mb-2">
      <div class="p-3 bg-primary/10 rounded-2xl">
        <VaIcon name="link" size="28px" color="primary" />
      </div>
      <div>
        <h2 class="text-2xl font-bold text-gray-800">URL Encoder / Decoder</h2>
        <p class="text-sm text-gray-400 mt-0.5">Percent-encode URLs or decode percent-encoded strings.</p>
      </div>
    </div>

    <VaCard>
      <VaCardContent>
        <VaAlert v-if="message" color="danger" dense class="mb-6">
          {{ message }}
        </VaAlert>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Input -->
          <div class="flex flex-col gap-3">
            <div class="text-xs font-bold text-primary uppercase tracking-widest">Input URL / Text</div>
            <VaTextarea
              v-model="input"
              placeholder="Paste or type URL/text here..."
              :min-rows="10"
              autosize
              class="w-full font-mono text-sm"
            />
            <div class="text-[10px] text-gray-400 text-right">{{ input.length }} chars</div>
          </div>

          <!-- Output -->
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <div class="text-xs font-bold text-primary uppercase tracking-widest">Output Result</div>
              <VaButton v-if="output" size="small" preset="secondary" icon="content_copy" @click="copyToClipboard(output)">Copy</VaButton>
            </div>
            <VaTextarea
              v-model="output"
              readonly
              placeholder="Result will appear here..."
              :min-rows="10"
              autosize
              class="w-full font-mono text-sm output-area"
            />
            <div class="text-[10px] text-gray-400 text-right">{{ output.length }} chars</div>
          </div>
        </div>

        <div class="flex gap-3 mt-6 pt-4 border-t border-gray-100">
          <VaButton @click="encode" icon="link">Encode</VaButton>
          <VaButton @click="decode" icon="link_off" preset="secondary">Decode</VaButton>
          <VaButton @click="clear" preset="secondary" border-color="warning">Clear</VaButton>
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
.output-area :deep(textarea) {
  background-color: #f8fafc;
}
</style>
