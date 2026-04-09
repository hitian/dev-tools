<template>
  <div class="space-y-6">
    <!-- Tool Header -->
    <div class="flex items-center gap-4 mb-2">
      <div class="p-3 bg-primary/10 rounded-2xl">
        <VaIcon name="key" size="28px" color="primary" />
      </div>
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Password &amp; Username Generator</h2>
        <p class="text-sm text-gray-400 mt-0.5">Generate secure random passwords and creative usernames.</p>
      </div>
    </div>

    <!-- Password Generator -->
    <VaCard>
      <VaCardContent>
        <div class="flex items-center gap-2 mb-6">
          <VaIcon name="lock" size="18px" color="primary" />
          <div class="text-xs font-bold text-primary uppercase tracking-widest">Password Generator</div>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <VaInput
            type="number"
            label="Total Length"
            v-model.number="length"
            :min="1"
            :max="256"
            class="font-mono"
          />
          <VaInput
            type="number"
            label="Min Digits"
            v-model.number="minDigits"
            :min="0"
            :max="256"
            class="font-mono"
          />
          <VaInput
            type="number"
            label="Min Symbols"
            v-model.number="minSymbols"
            :min="0"
            :max="256"
            class="font-mono"
          />
        </div>

        <div class="flex flex-wrap gap-6 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100 items-center justify-between">
          <div class="flex flex-wrap gap-6">
            <VaCheckbox v-model="useUpper" label="A-Z" />
            <VaCheckbox v-model="useLower" label="a-z" />
            <VaCheckbox v-model="useDigits" label="0-9" />
            <VaCheckbox v-model="useSymbols" label="!@#$%^&*" />
          </div>
          <VaCheckbox v-model="avoidAmbiguous" label="Avoid Ambiguous (0, O, l, 1)" />
        </div>

        <div class="flex gap-3 mb-6">
          <VaButton @click="generate" icon="refresh">Generate Password</VaButton>
          <VaButton @click="copy(password)" :disabled="!password" preset="secondary" icon="content_copy">Copy</VaButton>
        </div>

        <VaAlert v-if="error" color="danger" dense class="mb-6">
          {{ error }}
        </VaAlert>

        <div v-if="password" class="p-6 bg-primary/5 border border-primary/20 rounded-xl">
          <div class="text-[10px] font-bold text-primary uppercase tracking-widest mb-3 text-center">Generated Password</div>
          <div class="text-3xl font-mono font-bold break-all text-gray-800 text-center select-all leading-relaxed">{{ password }}</div>
          <div class="text-[10px] text-gray-400 text-center mt-3">{{ password.length }} characters · Click to select all</div>
        </div>
      </VaCardContent>
    </VaCard>

    <!-- Username Generator -->
    <VaCard>
      <VaCardContent>
        <div class="flex items-center gap-2 mb-6">
          <VaIcon name="person" size="18px" color="primary" />
          <div class="text-xs font-bold text-primary uppercase tracking-widest">Username Generator</div>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <VaSelect
            label="Style Pattern"
            v-model="usernameType"
            :options="['Adjective + Noun', 'Random String']"
          />
          <VaInput
            v-if="usernameType === 'Random String'"
            type="number"
            label="Length"
            v-model.number="usernameLength"
            :min="1"
            :max="64"
          />
          <VaInput
            type="number"
            label="Append Digits"
            v-model.number="appendDigitsCount"
            :min="0"
            :max="10"
          />
          <VaSelect
            label="Case Style"
            v-model="usernameCase"
            :options="['lowercase', 'UPPERCASE', 'PascalCase', 'camelCase', 'snake_case', 'kebab-case']"
          />
        </div>

        <div class="flex gap-3 mb-6">
          <VaButton @click="generateUsername" icon="person_add">Generate Username</VaButton>
          <VaButton @click="copy(username)" :disabled="!username" preset="secondary" icon="content_copy">Copy</VaButton>
        </div>

        <div v-if="username" class="p-6 bg-primary/5 border border-primary/20 rounded-xl">
          <div class="text-[10px] font-bold text-primary uppercase tracking-widest mb-3 text-center">Generated Username</div>
          <div class="text-2xl font-semibold break-all text-gray-800 text-center select-all">{{ username }}</div>
          <div class="text-[10px] text-gray-400 text-center mt-3">{{ username.length }} characters · Click to select all</div>
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
    upperSet() { return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
    lowerSet() { return 'abcdefghijklmnopqrstuvwxyz' },
    digitSet() { return '0123456789' },
    symbolSet() { return '!@#$%^&*' },
    ambiguousChars() { return new Set(['O', '0', '1', 'l', 'I', '|', 'S', '5', 'B', '8', '2', 'Z']) },
    ambiguousSymbols() { return new Set(['{', '}', '[', ']', '(', ')', '/', '\\', '\'', '"', '`', '~', ',', ';', ':', '.', '<', '>']) }
  },
  methods: {
    copy(text) {
      if (!text) return
      navigator.clipboard?.writeText(text).then(() => {
        this.$vaToast.init({
          message: 'Copied to clipboard!',
          color: 'success',
          duration: 2000
        });
      });
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
      return true
    },
    getCrypto() {
      if (typeof globalThis !== 'undefined' && globalThis.crypto && globalThis.crypto.getRandomValues) {
        return globalThis.crypto
      }
      return null
    },
    secureRandomInt(maxExclusive) {
      const cryptoApi = this.getCrypto()
      if (!cryptoApi) {
        return Math.floor(Math.random() * maxExclusive)
      }
      const buf = new Uint32Array(1)
      const UINT_MAX = 0x100000000
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

      const filterAmb = (s, isSymbol = false) => {
        if (!this.avoidAmbiguous) return s
        const ambSet = isSymbol ? this.ambiguousSymbols : this.ambiguousChars
        return [...s].filter((ch) => !ambSet.has(ch)).join('')
      }

      const upper = this.useUpper ? filterAmb(this.upperSet) : ''
      const lower = this.useLower ? filterAmb(this.lowerSet) : ''
      const digits = this.useDigits ? filterAmb(this.digitSet) : ''
      const symbols = this.useSymbols ? filterAmb(this.symbolSet, true) : ''

      const allowed = (upper + lower + digits + symbols)
      if (allowed.length === 0) {
        this.error = 'No characters available with current settings'
        return
      }

      const result = []
      for (let i = 0; i < this.minDigits; i++) result.push(this.pickRandom(digits))
      for (let i = 0; i < this.minSymbols; i++) result.push(this.pickRandom(symbols))

      const remaining = Math.max(0, this.length - result.length)
      for (let i = 0; i < remaining; i++) result.push(this.pickRandom(allowed))

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

      if (this.appendDigitsCount > 0) {
        let digits = ''
        for (let i = 0; i < this.appendDigitsCount; i++) digits += this.pickRandom(this.digitSet)
        base += (this.usernameType === 'Adjective + Noun' ? ' ' : '') + digits
      }

      this.username = this.applyCaseStyle(base, this.usernameCase)
    },
    applyCaseStyle(str, style) {
      const words = str.split(/\s+/).filter(Boolean)
      if (words.length === 0) return str
      switch (style) {
        case 'lowercase': return words.join('').toLowerCase()
        case 'UPPERCASE': return words.join('').toUpperCase()
        case 'PascalCase': return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
        case 'camelCase': return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
        case 'snake_case': return words.map(w => w.toLowerCase()).join('_')
        case 'kebab-case': return words.map(w => w.toLowerCase()).join('-')
        default: return str
      }
    }
  }
}
</script>

<style scoped>
</style>
