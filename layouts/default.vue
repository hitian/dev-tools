<template>
  <div class="container">
    <tab-bar />
    <nuxt/>
  </div>
</template>

<script>
import TabBar from '~/components/TabBar.vue'

export default {
  components: {
    TabBar
  }
}
</script>