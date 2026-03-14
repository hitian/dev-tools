<template>
    <div class="tabs-container">
        <div class="version-badge">{{ appVersion }}</div>
        <VaTabs v-model="activeTab">
            <template #tabs>
                <VaTab>TIME</VaTab>
                <VaTab>Base64</VaTab>
                <VaTab>JSON</VaTab>
                <VaTab>URL Encode</VaTab>
                <VaTab>Password</VaTab>
                <VaTab>QR Code</VaTab>
            </template>
        </VaTabs>
        <div class="tabs-content">
            <Time v-if="activeTab === 0"></Time>
            <Base64 v-if="activeTab === 1"></Base64>
            <Json v-if="activeTab === 2"></Json>
            <Url v-if="activeTab === 3"></Url>
            <PasswordGenerator v-if="activeTab === 4"></PasswordGenerator>
            <QrCode v-if="activeTab === 5"></QrCode>
        </div>
    </div>
</template>
<script>
import Time from '~/components/Time.vue'
import Base64 from '~/components/Base64.vue'
import Json from '~/components/Json.vue'
import Url from '~/components/Url.vue'
import PasswordGenerator from '~/components/PasswordGenerator.vue'
import QrCode from '~/components/QrCode.vue'
export default {
    components: {
        Time
    },
    data() {
        const config = useRuntimeConfig();
        return {
            appVersion: config.public.appVersion || 'debug',
            activeTab: 0,
            tabKeys: ['time', 'base64', 'json', 'url', 'password', 'qrcode']
        }
    },
    created() {
        this.setActiveTabFromRoute()
    },
    watch: {
        activeTab(newVal) {
            this.updateRouteForTab(newVal)
        },
        '$route.query.tab'() {
            this.setActiveTabFromRoute()
        },
        '$route.hash'() {
            this.setActiveTabFromRoute()
        }
    },
    methods: {
        setActiveTabFromRoute() {
            const q = this.$route?.query || {}
            const hashKey = (this.$route?.hash || '').toString().replace(/^#/, '').toLowerCase()
            const queryKey = (q.tab || '').toString().toLowerCase()
            const key = this.tabKeys.includes(hashKey) ? hashKey : queryKey
            const idx = this.tabKeys.indexOf(key)
            this.activeTab = idx >= 0 ? idx : 0
        },
        updateRouteForTab(index) {
            try {
                const key = this.tabKeys[index] || this.tabKeys[0]
                const nextHash = `#${key}`
                // Avoid pushing duplicate state
                if (this.$route?.hash !== nextHash) {
                    this.$router.replace({ hash: nextHash, query: this.$route?.query || {} })
                }
            } catch (e) {
                // no-op on SSR or router absence
            }
        }
    }
}
</script>
<style>
.tabs-container {
    width: 100%;
    height: 100vh;
    /* Make it fill the window vertically */
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
    /* Ensure padding doesn't add to width/height */
}

.tabs-content {
    text-align: left;
    margin-top: 10px;
}

.version-badge {
    position: fixed;
    top: 5px;
    right: 10px;
    font-size: 10px;
    color: #999;
    z-index: 1000;
    pointer-events: none;
    font-family: monospace;
}
</style>
