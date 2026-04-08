<template>
  <div class="generator-container">
    <VaCard class="my-mb-20">
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
            <VaButton class="my-ml-10" color="#3D9209" @click="copy(password)" :disabled="!password">Copy</VaButton>
          </div>

          <VaAlert class="my-mt-10" v-if="error" color="danger" :description="error" />

          <div class="my-mt-10">
            <VaInput label="Password" v-model="password" readonly />
          </div>
        </div>
      </VaCardContent>
    </VaCard>

    <VaCard>
      <VaCardTitle>Username Generator</VaCardTitle>
      <VaCardContent>
        <div class="controls">
          <div class="row">
            <VaSelect
              label="Type"
              v-model="usernameType"
              :options="['Adjective + Noun', 'Random String']"
              style="width: 200px"
            />
            <VaInput
              v-if="usernameType === 'Random String'"
              class="my-ml-10"
              type="number"
              label="Length"
              v-model.number="usernameLength"
              :min="1"
              :max="64"
              style="width: 100px"
            />
            <VaInput
              class="my-ml-10"
              type="number"
              label="Append Digits"
              v-model.number="appendDigitsCount"
              :min="0"
              :max="10"
              style="width: 120px"
            />
          </div>

          <div class="row my-mt-10 checkbox-row">
            <VaSelect
              label="Case Style"
              v-model="usernameCase"
              :options="['lowercase', 'UPPERCASE', 'PascalCase', 'camelCase', 'snake_case', 'kebab-case']"
              style="width: 200px"
            />
          </div>

          <div class="row my-mt-10">
            <VaButton color="#3D9209" @click="generateUsername">Generate</VaButton>
            <VaButton class="my-ml-10" color="#3D9209" @click="copy(username)" :disabled="!username">Copy</VaButton>
          </div>

          <div class="my-mt-10">
            <VaInput label="Username" v-model="username" readonly />
          </div>
        </div>
      </VaCardContent>
    </VaCard>
  </div>
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
      error: '',

      // Username Generator Data
      username: '',
      usernameType: 'Adjective + Noun',
      usernameLength: 10,
      appendDigitsCount: 2,
      usernameCase: 'PascalCase',
      adjectives: [
        'Swift', 'Brave', 'Clever', 'Happy', 'Silently', 'Bright', 'Golden', 'Mighty', 'Cool', 'Epic',
        'Fierce', 'Gentle', 'Kind', 'Lucky', 'Noble', 'Quick', 'Rare', 'Silent', 'Strong', 'Wild',
        'Witty', 'Zesty', 'Amazing', 'Bold', 'Daring', 'Elite', 'Fancy', 'Grand', 'Humble', 'Iron'
      ],
      nouns: [
        'Falcon', 'Tiger', 'Panda', 'Eagle', 'Wolf', 'Lion', 'Bear', 'Shark', 'Dragon', 'Phoenix',
        'Knight', 'Ninja', 'Wizard', 'Hero', 'Ghost', 'Shadow', 'Storm', 'Thunder', 'River', 'Forest',
        'Mountain', 'Ocean', 'Star', 'Moon', 'Sun', 'Comet', 'Planet', 'Galaxy', 'Nova', 'Titan'
      ]
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
    copy(text) {
      if (!text) return
      navigator.clipboard?.writeText(text)
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
    },

    generateUsername() {
      let base = ''
      if (this.usernameType === 'Adjective + Noun') {
        const adj = this.adjectives[this.secureRandomInt(this.adjectives.length)]
        const noun = this.nouns[this.secureRandomInt(this.nouns.length)]
        base = `${adj} ${noun}`
      } else {
        const charset = this.lowerSet + this.upperSet + this.digitSet
        for (let i = 0; i < this.usernameLength; i++) {
          base += this.pickRandom(charset)
        }
      }

      // Add random digits if requested
      if (this.appendDigitsCount > 0) {
        let digits = ''
        for (let i = 0; i < this.appendDigitsCount; i++) {
          digits += this.pickRandom(this.digitSet)
        }
        if (this.usernameType === 'Adjective + Noun') {
          base += ' ' + digits
        } else {
          base += digits
        }
      }

      this.username = this.applyCaseStyle(base, this.usernameCase)
    },

    applyCaseStyle(str, style) {
      const words = str.split(/\s+/).filter(Boolean)
      if (words.length === 0) return str

      switch (style) {
        case 'lowercase':
          return words.join('').toLowerCase()
        case 'UPPERCASE':
          return words.join('').toUpperCase()
        case 'PascalCase':
          return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
        case 'camelCase':
          return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
        case 'snake_case':
          return words.map(w => w.toLowerCase()).join('_')
        case 'kebab-case':
          return words.map(w => w.toLowerCase()).join('-')
        default:
          return str
      }
    }
  }
}
</script>

<style scoped>
.generator-container {
  display: flex;
  flex-direction: column;
}
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
.my-mb-20 {
  margin-bottom: 20px;
}
.my-ml-10 {
  margin-left: 10px;
}
.my-mt-10 {
  margin-top: 10px;
}
</style>
