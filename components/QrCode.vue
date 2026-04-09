<template>
  <div class="space-y-6">
    <VaCard>
      <VaCardContent>
        <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Content</div>
        <VaTextarea
          v-model="text"
          placeholder="Type text, URL, phone, or formatted content (e.g., tel:+1234567890)"
          :min-rows="4"
          autosize
          class="w-full font-mono text-sm mb-4"
        />

        <VaAlert v-if="error" color="danger" dense class="mb-4">
          {{ error }}
        </VaAlert>

        <div v-if="text && svg" class="mt-8 flex flex-col items-center">
          <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">QR Code Preview</div>
          <div class="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 preview-container" ref="previewContainer" v-html="svg"></div>
          <div class="mt-6">
            <VaButton size="small" preset="secondary" icon="download" @click="downloadSVG">Download SVG</VaButton>
          </div>
        </div>
        <div v-else class="mt-8 py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400">
          <VaIcon name="qr_code_2" size="large" class="mb-2 opacity-20" />
          <p>Enter content to generate preview</p>
        </div>
      </VaCardContent>
    </VaCard>

    <VaCard>
      <VaCardContent>
        <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Common Examples</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="ex in examples"
            :key="ex.label"
            class="p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-between group"
            @click="applyExample(ex.value)"
          >
            <div class="min-w-0 flex-1">
              <div class="text-xs font-bold text-primary uppercase tracking-wider">{{ ex.label }}</div>
              <div class="text-sm text-gray-600 truncate">{{ ex.value }}</div>
            </div>
            <VaButton size="small" preset="plain" icon="arrow_forward" class="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </VaCardContent>
    </VaCard>
  </div>
</template>

<script>
import { encode, renderSVG } from 'uqr'

export default {
  name: 'QrCode',
  data() {
    return {
      text: '',
      error: '',
      viewportWidth: 0,
      viewportHeight: 0,
      ro: null
    }
  },
  computed: {
    svg() {
      if (!this.text) return ''
      try {
        this.error = ''
        const qr = encode(this.text)
        if (typeof window === 'undefined') {
          return renderSVG(this.text, { pixelSize: 8 })
        }
        const vw = this.viewportWidth || window.innerWidth || 0
        const vh = this.viewportHeight || window.innerHeight || 0
        const availableW = Math.max(50, vw - 120)
        const availableH = Math.max(50, vh - 500)
        const targetSize = Math.min(availableW, availableH, 400)
        let px = 8
        if (qr?.size && targetSize > 0) {
          px = Math.floor(targetSize / qr.size)
        }
        px = Math.max(2, px)
        return renderSVG(this.text, { pixelSize: px })
      } catch (e) {
        this.error = String(e?.message || e)
        return ''
      }
    },
    examples() {
      return [
        { label: 'URL', value: 'https://example.com' },
        { label: 'Phone', value: 'tel:+1234567890' },
        { label: 'SMS', value: 'sms:+1234567890?body=Hello%20there' },
        { label: 'Email', value: 'mailto:user@example.com?subject=Hello&body=This%20is%20a%20test' },
        { label: 'WiFi', value: 'WIFI:T:WPA;S:MySSID;P:MyPassword;;' },
        { label: 'Geo', value: 'geo:37.786971,-122.399677' }
      ]
    }
  },
  methods: {
    applyExample(v) {
      this.text = v
    },
    downloadSVG() {
      if (!this.svg) return
      const blob = new Blob([this.svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `qrcode-${Date.now()}.svg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    },
    updateContainerMetrics() {
      if (typeof window !== 'undefined') {
        this.viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0
        this.viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.updateContainerMetrics()
      if (typeof ResizeObserver !== 'undefined') {
        this.ro = new ResizeObserver(() => this.updateContainerMetrics())
        if (this.$refs.previewContainer) this.ro.observe(this.$refs.previewContainer)
      }
      window.addEventListener('resize', this.updateContainerMetrics)
    })
  },
  beforeUnmount() {
    if (this.ro) this.ro.disconnect()
    window.removeEventListener('resize', this.updateContainerMetrics)
  }
}
</script>

<style scoped>
.preview-container :deep(svg) {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
