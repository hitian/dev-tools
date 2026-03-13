<template>
    <VaCard>
        <VaCardTitle>JSON Tree View</VaCardTitle>
        <VaCardContent>
            <VaTextarea v-model="input" style="width: 100%;" minRows="10" placeholder="input here" autosize />
            <div style="margin-top: 10px;text-align: left;">
                <VaButton @click="minify">
                    minify
                </VaButton>
                <VaButton @click="copyFormatted" class="ml-2">
                    Format & Copy
                </VaButton>
            </div>
            <VaAlert color="danger" v-if="errMessage" :description="errMessage" />
            <pre v-if="errSnippet" class="codeframe" v-html="errSnippet"></pre>
            <div v-if="errFrom" class="from-block">
                <div class="from-title">Starting at error:</div>
                <pre class="codeframe">{{ errFrom }}</pre>
            </div>
            <p>
                <vue-json-pretty :data="inputJson">
                </vue-json-pretty>
            </p>
        </VaCardContent>
    </VaCard>
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
            jsonSource: "{}",
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
            let json
            try {
                json = JSON.parse(this.input)
            } catch (e) {
                const { message, snippet, fromText } = this.describeJsonError(e, this.input)
                this.errMessage = message
                this.errSnippet = snippet
                this.errFrom = fromText
                return ""
            }
            this.errMessage = ""
            this.errSnippet = ""
            this.errFrom = ""
            return json
        }
    },
    methods: {
        selectAll(event) {
            event.target.select();
        },
        minify() {
            try {
                this.input = JSON.stringify(JSON.parse(this.input))
                this.errMessage = ""
                this.errSnippet = ""
                this.errFrom = ""
            } catch (error) {
                const { message, snippet, fromText } = this.describeJsonError(error, this.input)
                this.errMessage = message
                this.errSnippet = snippet
                this.errFrom = fromText
                this.$vaToast.error("Invalid JSON format", {
                    duration: 3000,
                });
            }
        },
        copyFormatted() {
            try {
                const json = JSON.parse(this.input);
                const formatted = JSON.stringify(json, null, 2);
                this.copyToClipboard(formatted);
            } catch (e) {
                this.$vaToast.error("Invalid JSON format. Please check the input.", {
                    duration: 3000,
                });
            }
        },
        copyToClipboard(text) {
            if (!navigator.clipboard) {
                this.$vaToast.error("Clipboard API is not supported in this browser.", {
                    duration: 3000,
                });
                return;
            }

            navigator.clipboard.writeText(text).then(
                () => {
                    this.$vaToast.success("Formatted JSON copied to clipboard!", {
                        duration: 2000,
                    });
                },
                (err) => {
                    console.error("Failed to copy: ", err);
                    this.$vaToast.error("Failed to copy. Please try again.", {
                        duration: 2000,
                    });
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
                  ? `${before}<span class="err-highlight">${errChar}</span>${after}`
                  : `${before}<span class="err-highlight">⟂</span>${after}`

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
  background: #f7f7f7;
  padding: 10px;
  border-radius: 6px;
  overflow: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  white-space: pre-wrap;
}
.codeframe .err-highlight {
  background: #ffdce0;
  color: #b31d28;
  border-bottom: 1px solid #b31d28;
}
.from-block {
  margin-top: 8px;
}
.from-title {
  font-weight: 600;
  margin-bottom: 4px;
}
</style>
