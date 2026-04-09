<template>
  <div class="space-y-6">
    <!-- Tool Header -->
    <div class="flex items-center gap-4 mb-2">
      <div class="p-3 bg-primary/10 rounded-2xl">
        <VaIcon name="format_align_left" size="28px" color="primary" />
      </div>
      <div>
        <h2 class="text-2xl font-bold text-gray-800">JSON Formatter</h2>
        <p class="text-sm text-gray-400 mt-0.5">Format, minify, and explore JSON data interactively.</p>
      </div>
    </div>

    <VaCard>
      <VaCardContent>
        <div class="text-xs font-bold text-primary uppercase tracking-widest mb-4">Input JSON</div>
        <VaTextarea
          v-model="input"
          placeholder="Paste or type JSON here..."
          :min-rows="8"
          autosize
          @blur="handleBlur"
          class="w-full font-mono text-sm mb-6"
        />
        
        <div class="flex gap-3 mb-8">
          <VaButton @click="copyFormatted" icon="format_align_left">Format & Copy</VaButton>
          <VaButton @click="minify" preset="secondary" icon="compress">Minify</VaButton>
          <VaButton @click="clear" preset="secondary" border-color="warning">Clear</VaButton>
        </div>

        <div v-if="errMessage" class="space-y-4 mb-8">
          <VaAlert color="danger" :description="errMessage" dense />
          <div class="p-3 bg-red-50 border border-red-100 rounded-lg overflow-auto">
            <pre class="text-xs font-mono text-red-800 whitespace-pre-wrap" v-html="errSnippet"></pre>
          </div>
          <div v-if="errFrom" class="from-block">
            <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Starting at error:</div>
            <pre class="p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs font-mono text-gray-600 overflow-auto">{{ errFrom }}</pre>
          </div>
        </div>

        <div class="mt-8">
          <div class="flex items-center gap-2 mb-4">
            <VaIcon name="account_tree" size="16px" color="primary" />
            <div class="text-xs font-bold text-primary uppercase tracking-widest">Interactive Tree View</div>
          </div>
          <div class="p-4 bg-gray-50 rounded-xl border border-gray-100 overflow-auto max-h-[500px]">
            <vue-json-pretty :data="inputJson" :depth="2" :show-length="true" />
          </div>
        </div>
      </VaCardContent>
    </VaCard>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css';

export default {
  components: {
    VueJsonPretty
  },
  data() {
    return {
      input: "{}",
      errMessage: "",
      errSnippet: "",
      errFrom: "",
    }
  },
  computed: {
    inputJson() {
      if (this.input.trim() === "") {
        return ""
      }
      try {
        const json = JSON.parse(this.input)
        this.errMessage = ""
        this.errSnippet = ""
        this.errFrom = ""
        return json
      } catch (e) {
        const { message, snippet, fromText } = this.describeJsonError(e, this.input)
        this.errMessage = message
        this.errSnippet = snippet
        this.errFrom = fromText
        return ""
      }
    }
  },
  methods: {
    clear() {
      this.input = "";
      this.errMessage = "";
      this.errSnippet = "";
      this.errFrom = "";
    },
    handleBlur() {
      let val = this.input.trim();
      if (!val) return;

      try {
        const parsed = JSON.parse(val);
        if (typeof parsed === 'string') {
          const finalJson = JSON.parse(parsed);
          this.input = JSON.stringify(finalJson, null, 2);
          this.$vaToast.info("Detected escaped JSON and formatted it.", { duration: 2000 });
        }
      } catch (e) {
        try {
          let unescaped = null;
          if (val.startsWith('"') && val.endsWith('"')) {
            unescaped = JSON.parse(val);
          } else {
            unescaped = JSON.parse('"' + val + '"');
          }

          if (typeof unescaped === 'string') {
            const finalJson = JSON.parse(unescaped);
            this.input = JSON.stringify(finalJson, null, 2);
            this.$vaToast.info("Detected escaped JSON and formatted it.", { duration: 2000 });
          }
        } catch (error) {}
      }
    },
    minify() {
      try {
        if (!this.input.trim()) return;
        this.input = JSON.stringify(JSON.parse(this.input))
        this.errMessage = ""
        this.errSnippet = ""
        this.errFrom = ""
      } catch (error) {
        this.$vaToast.error("Invalid JSON format", { duration: 3000 });
      }
    },
    copyFormatted() {
      try {
        if (!this.input.trim()) return;
        const json = JSON.parse(this.input);
        const formatted = JSON.stringify(json, null, 2);
        this.input = formatted; // Update input with formatted version
        this.copyToClipboard(formatted);
      } catch (e) {
        this.$vaToast.error("Invalid JSON format. Please check the input.", { duration: 3000 });
      }
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(
        () => {
          this.$vaToast.success("Copied to clipboard!", { duration: 2000 });
        },
        () => {
          this.$vaToast.error("Failed to copy. Please try again.", { duration: 2000 });
        }
      );
    },
    describeJsonError(err, source) {
      const msg = String(err && err.message ? err.message : err)
      const m = msg.match(/position\s+(\d+)/i)
      let pos = m ? parseInt(m[1], 10) : -1
      if (isNaN(pos)) pos = -1
      let line = 1, col = 1
      if (pos >= 0) {
        for (let i = 0; i < pos && i < source.length; i++) {
          if (source[i] === '\n') { line++; col = 1 } else { col++ }
        }
      }
      let snippet = ''
      let fromText = ''
      if (pos >= 0 && pos <= source.length) {
        const start = source.lastIndexOf('\n', Math.max(0, pos - 1)) + 1
        const endIdx = source.indexOf('\n', pos)
        const end = endIdx === -1 ? source.length : endIdx
        const lineText = source.slice(start, end)

        const esc = (s) => String(s)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')

        const before = esc(lineText.slice(0, Math.max(0, col - 1)))
        const errCharRaw = lineText[col - 1]
        const errChar = typeof errCharRaw === 'string' ? esc(errCharRaw) : ''
        const after = esc(lineText.slice(Math.max(0, col)))

        const highlighted = errChar
          ? `${before}<span class="err-highlight font-bold text-red-600 underline">${errChar}</span>${after}`
          : `${before}<span class="err-highlight font-bold text-red-600 underline">⟂</span>${after}`

        snippet = `Line ${line}, Column ${col}<br/>${highlighted}`

        const sliceLen = 200
        const sliced = source.slice(pos, Math.min(source.length, pos + sliceLen))
        fromText = (pos > 0 ? '…' : '') + sliced
      }
      const friendly = pos >= 0
        ? `JSON parse error at line ${line}, column ${col}: ${msg}`
        : `JSON parse error: ${msg}`
      return { message: friendly, snippet, fromText }
    }
  }
}
</script>

<style scoped>
.codeframe {
  background: #f1f5f9;
  padding: 12px;
  border-radius: 8px;
  overflow: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  white-space: pre-wrap;
  border: 1px solid #e2e8f0;
}
</style>
