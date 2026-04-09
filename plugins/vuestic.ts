import { createVuestic } from 'vuestic-ui'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuestic-ui/css'
import 'vuestic-ui/styles/reset.css'
import 'vuestic-ui/styles/typography.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(createVuestic({
    config: {
      colors: {
        variables: {
          primary: '#3D9209',
          secondary: '#767C88',
          success: '#3D9209',
          info: '#158DE3',
          danger: '#E42222',
          warning: '#FFD43A',
          backgroundPrimary: '#f4f8f1',
          backgroundSecondary: '#ffffff',
          backgroundElement: '#ffffff',
        }
      },
      components: {
        VaCard: {
          bordered: false,
          shadow: 'md',
          borderRadius: 'lg',
        },
        VaButton: {
          round: true,
        },
        VaInput: {
          bordered: false,
          borderRadius: 'md',
        },
        VaCheckbox: {
          color: 'primary',
        },
        VaSelect: {
          bordered: false,
          borderRadius: 'md',
        }
      }
    }
  }))
})
