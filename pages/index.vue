<template>
    <div class="tabs-container">
        <VaTabs v-model="activeTab">
            <template #tabs>
                <VaTab>TIME</VaTab>
                <VaTab>Base64</VaTab>
                <VaTab>JSON</VaTab>
                <VaTab>URL Encode</VaTab>
            </template>
        </VaTabs>
        <div class="tabs-content">
            <Time v-if="activeTab === 0"></Time>
            <Base64 v-if="activeTab === 1"></Base64>
            <Json v-if="activeTab === 2"></Json>
            <Url v-if="activeTab === 3"></Url>
        </div>
    </div>
</template>
<script>
import Time from '~/components/Time.vue'
import Base64 from '~/components/Base64.vue'
import Json from '~/components/Json.vue'
import Url from '~/components/Url.vue'
export default {
    components: {
        Time
    },
    data() {
        return {
            activeTab: 0
        }
    }
}
</script>
<style>
.tabs-container {
    max-width: 720px;
    margin: 0 auto;
}

.tabs-content {
    text-align: left;
    margin-top: 10px;
}
</style>