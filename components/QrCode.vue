<template>
  <div class="qrcode-page">
    <VaCard>
      <VaCardTitle>QR Code Generator</VaCardTitle>
      <VaCardContent>
        <VaTextarea v-model="text" style="width: 100%" minRows="4" autosize
          placeholder="Type text, URL, phone, or formatted content (e.g., tel:+1234567890)" />

        



        <VaAlert class="my-mt-10" color="danger" v-if="error" :description="error" />

        <div class="my-mt-10">
          <div v-if="text && svg" class="qr-preview" ref="previewContainer" v-html="svg"></div>
          <div v-else class="muted">Enter content to preview QR code.</div>
        </div>
      </VaCardContent>
    </VaCard>

    <VaCard class="my-mt-10">
      <VaCardTitle>Examples</VaCardTitle>
      <VaCardContent>
        <div class="examples">
          <div class="example-row" v-for="ex in examples" :key="ex.label">
            <VaButton size="small" @click="applyExample(ex.value)">Use</VaButton>
            <div class="example-label">{{ ex.label }}</div>
            <div class="example-value">{{ ex.value }}</div>
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
      containerWidth: 0,
      containerHeight: 0,
      ro: null,
      viewportWidth: 0,
      viewportHeight: 0
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

        // Get viewport dimensions
        const vw = this.viewportWidth || window.innerWidth || 0
        const vh = this.viewportHeight || window.innerHeight || 0

        // Calculate available space with padding
        const availableW = Math.max(50, vw - 60)
        const availableH = Math.max(50, vh - 400)

        // Use the shorter side as the target QR code size
        const targetSize = Math.min(availableW, availableH)

        // Calculate pixel size based on QR matrix dimensions
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
        this.ro = new ResizeObserver(() => {
          this.updateContainerMetrics()
        })
        const el = this.$refs.previewContainer
        if (el) this.ro.observe(el)
      } else if (typeof window !== 'undefined') {
        window.addEventListener('resize', this.updateContainerMetrics)
      }
    })
  },
  beforeUnmount() {
    if (this.ro && this.$refs.previewContainer) {
      try { this.ro.unobserve(this.$refs.previewContainer) } catch { }
      try { this.ro.disconnect() } catch { }
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateContainerMetrics)
    }
  }
}
</script>

<style scoped>
.qrcode-page {
  padding: 10px;
}

.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.qr-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 640px;
  max-height: 640px;
  margin: 20px auto;
  overflow: hidden;
}

.qr-preview svg {
  width: 100%;
  height: 100%;
  display: block;
}

.muted {
  color: #8a8a8a;
  text-align: center;
  padding: 20px;
}

.examples {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.example-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.example-label {
  min-width: 90px;
  font-weight: 600;
}

.example-value {
  word-break: break-all;
  flex: 1;
}
</style>
