<template>
  <VaLayout
    :top="{ fixed: true, order: 2 }"
    :left="{ fixed: true, order: 1, minimized: isSidebarMinimized, width: '280px' }"
  >
    <template #top>
      <VaNavbar color="primary" class="py-2 px-4 shadow-md">
        <template #left>
          <VaButton
            :icon="isSidebarMinimized ? 'menu' : 'menu_open'"
            preset="plain"
            color="backgroundPrimary"
            @click="isSidebarMinimized = !isSidebarMinimized"
          />
          <VaNavbarItem class="font-bold text-xl ml-4 text-white">
            DEV TOOLS
          </VaNavbarItem>
        </template>
        <template #right>
          <div class="version-badge-navbar">{{ appVersion }}</div>
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="isSidebarMinimized" class="modern-sidebar">
        <VaSidebarItem
          v-for="(tab, index) in tabKeys"
          :key="tab"
          :active="activeTab === index"
          @click="activeTab = index"
          active-color="primary"
          class="my-1 mx-2 rounded-lg"
        >
          <VaSidebarItemContent>
            <VaIcon :name="tabIcons[index]" class="mr-3" />
            <VaSidebarItemTitle class="uppercase font-semibold tracking-wider text-xs">
              {{ tabLabels[index] }}
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </template>

    <template #content>
      <div class="p-6 bg-slate-50 min-h-screen">
        <transition name="fade-slide" mode="out-in">
          <div :key="activeTab">
            <Time v-if="activeTab === 0"></Time>
            <Base64 v-if="activeTab === 1"></Base64>
            <Json v-if="activeTab === 2"></Json>
            <Url v-if="activeTab === 3"></Url>
            <PasswordGenerator v-if="activeTab === 4"></PasswordGenerator>
            <QrCode v-if="activeTab === 5"></QrCode>
          </div>
        </transition>
      </div>
    </template>
  </VaLayout>
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
    Time, Base64, Json, Url, PasswordGenerator, QrCode
  },
  data() {
    const config = useRuntimeConfig();
    return {
      appVersion: config.public.appVersion || 'debug',
      activeTab: 0,
      isSidebarMinimized: false,
      tabKeys: ['time', 'base64', 'json', 'url', 'password', 'qrcode'],
      tabLabels: ['Time Converter', 'Base64 Tool', 'JSON Formatter', 'URL Encoder', 'Password & User', 'QR Generator'],
      tabIcons: ['schedule', 'code', 'format_align_left', 'link', 'key', 'qr_code_2']
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
        if (this.$route?.hash !== nextHash) {
          this.$router.replace({ hash: nextHash, query: this.$route?.query || {} })
        }
      } catch (e) {}
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f8fafc;
}

.modern-sidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.version-badge-navbar {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-family: monospace;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Vuestic Overrides for Modernity */
.va-sidebar-item--active {
  background: rgba(61, 146, 9, 0.1) !important;
}

.va-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
</style>
