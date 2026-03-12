<template>
  <VaCard>
    <VaCardTitle>Password Generator</VaCardTitle>
    <VaCardContent>
      <div class="controls">
        <div class="row">
          <VaInput
            type="number"
            label="Length"
            v-model.number="length"
            :min="1"
            :max="256"
            style="width: 140px"
          />
          <VaInput
            class="my-ml-10"
            type="number"
            label="Min digits"
            v-model.number="minDigits"
            :min="0"
            :max="256"
            style="width: 140px"
          />
          <VaInput
            class="my-ml-10"
            type="number"
            label="Min symbols"
            v-model.number="minSymbols"
            :min="0"
            :max="256"
            style="width: 140px"
          />
        </div>

        <div class="row my-mt-10 checkbox-row">
          <VaCheckbox v-model="useUpper" label="A-Z" />
          <VaCheckbox v-model="useLower" label="a-z" />
          <VaCheckbox v-model="useDigits" label="0-9" />
          <VaCheckbox v-model="useSymbols" label="!@#$%^&*" />
        </div>

        <div class="row my-mt-10">
          <VaCheckbox v-model="avoidAmbiguous" label="Avoid easily confused characters" />
        </div>

        <div class="row my-mt-10">
          <VaButton color="#3D9209" @click="generate">Generate</VaButton>
          <VaButton class="my-ml-10" color="#3D9209" @click="copy" :disabled="!password">Copy</VaButton>
        </div>

        <VaAlert class="my-mt-10" v-if="error" color="danger" :description="error" />

        <div class="my-mt-10">
          <VaInput label="Password" v-model="password" readonly />
        </div>
      </div>
    </VaCardContent>
  </VaCard>
</template>

<script>
export default {
  name: 'PasswordGenerator',
  data() {
    return {
      length: 16,
      useUpper: true,
      useLower: true,
      useDigits: true,
      useSymbols: true,
      minDigits: 0,
      minSymbols: 0,
      avoidAmbiguous: false,
      password: '',
      error: ''
    }
  },
  computed: {
    upperSet() {
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    },
    lowerSet() {
      return 'abcdefghijklmnopqrstuvwxyz'
    },
    digitSet() {
      return '0123456789'
    },
    symbolSet() {
      return '!@#$%^&*'
    },
    ambiguousChars() {
      // Commonly confused: O,0,1,l,I,|,S,5,B,8,2,Z and some punctuation
      return new Set(['O', '0', '1', 'l', 'I', '|', 'S', '5', 'B', '8', '2', 'Z'])
    },
    ambiguousSymbols() {
      return new Set(['{', '}', '[', ']', '(', ')', '/', '\\', '\'', '"', '`', '~', ',', ';', ':', '.', '<', '>'])
    }
  },
  methods: {
    copy() {
      if (!this.password) return
      navigator.clipboard?.writeText(this.password)
    },
    validate() {
      this.error = ''

      if (this.length < 1) {
        this.error = 'Length must be at least 1'
        return false
      }

      const setsSelected = [this.useUpper, this.useLower, this.useDigits, this.useSymbols].some(Boolean)
      if (!setsSelected) {
        this.error = 'Select at least one character set'
        return false
      }

      if (this.minDigits > 0 && !this.useDigits) {
        this.error = 'Min digits requires digits (0-9) set enabled'
        return false
      }
      if (this.minSymbols > 0 && !this.useSymbols) {
        this.error = 'Min symbols requires symbols (!@#$%^&*) set enabled'
        return false
      }

      if (this.minDigits + this.minSymbols > this.length) {
        this.error = 'Length too short for required counts'
        return false
      }

      // Ensure after excluding ambiguous chars, we still have available chars
      const allowed = this.buildAllowed()
      if (allowed.length === 0) {
        this.error = 'No characters available with current settings'
        return false
      }

      return true
    },
    buildAllowed() {
      let allowed = ''
      const filterAmb = (s, isSymbol = false) => {
        if (!this.avoidAmbiguous) return s
        const ambSet = isSymbol ? this.ambiguousSymbols : this.ambiguousChars
        return [...s].filter((ch) => !ambSet.has(ch)).join('')
      }

      if (this.useUpper) allowed += filterAmb(this.upperSet)
      if (this.useLower) allowed += filterAmb(this.lowerSet)
      if (this.useDigits) allowed += filterAmb(this.digitSet)
      if (this.useSymbols) allowed += filterAmb(this.symbolSet, true)

      return allowed
    },
    getCrypto() {
      // Prefer Web Crypto API. In browsers and modern Node (via webcrypto), this exists.
      if (typeof globalThis !== 'undefined' && globalThis.crypto && globalThis.crypto.getRandomValues) {
        return globalThis.crypto
      }
      this.error = 'Secure random generator is unavailable in this environment.'
      return null
    },
    secureRandomInt(maxExclusive) {
      if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
        throw new Error('maxExclusive must be a positive integer')
      }
      const cryptoApi = this.getCrypto()
      if (!cryptoApi) throw new Error('Crypto API not available')
      const buf = new Uint32Array(1)
      const UINT_MAX = 0x100000000 // 2^32
      const limit = Math.floor(UINT_MAX / maxExclusive) * maxExclusive
      while (true) {
        cryptoApi.getRandomValues(buf)
        const x = buf[0]
        if (x < limit) return x % maxExclusive
      }
    },
    pickRandom(str) {
      if (!str || str.length === 0) return ''
      const idx = this.secureRandomInt(str.length)
      return str[idx]
    },
    shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = this.secureRandomInt(i + 1)
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    },
    generate() {
      if (!this.validate()) return

      const upper = this.useUpper ? (this.avoidAmbiguous ? [...this.upperSet].filter(c => !this.ambiguousChars.has(c)).join('') : this.upperSet) : ''
      const lower = this.useLower ? (this.avoidAmbiguous ? [...this.lowerSet].filter(c => !this.ambiguousChars.has(c)).join('') : this.lowerSet) : ''
      const digits = this.useDigits ? (this.avoidAmbiguous ? [...this.digitSet].filter(c => !this.ambiguousChars.has(c)).join('') : this.digitSet) : ''
      const symbols = this.useSymbols ? (this.avoidAmbiguous ? [...this.symbolSet].filter(c => !this.ambiguousSymbols.has(c)).join('') : this.symbolSet) : ''

      const allowed = (upper + lower + digits + symbols)
      if (allowed.length === 0) {
        this.error = 'No characters available with current settings'
        return
      }

      const result = []

      // If we require more than available from a set, guard it
      if (this.minDigits > 0 && digits.length === 0) {
        this.error = 'No digits available after filtering ambiguous characters'
        return
      }
      if (this.minSymbols > 0 && symbols.length === 0) {
        this.error = 'No symbols available after filtering ambiguous characters'
        return
      }

      // Satisfy required digits
      for (let i = 0; i < this.minDigits; i++) {
        result.push(this.pickRandom(digits))
      }
      // Satisfy required symbols
      for (let i = 0; i < this.minSymbols; i++) {
        result.push(this.pickRandom(symbols))
      }

      // Fill the rest
      const remaining = Math.max(0, this.length - result.length)
      for (let i = 0; i < remaining; i++) {
        result.push(this.pickRandom(allowed))
      }

      // Shuffle for randomness
      this.password = this.shuffleArray(result).join('')
    }
  }
}
</script>

<style scoped>
.controls {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.checkbox-row {
  gap: 20px;
}
</style>
