import { createVuestic } from 'vuestic-ui'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuestic-ui/css'
import 'vuestic-ui/styles/reset.css'
import 'vuestic-ui/styles/typography.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(createVuestic())
})
