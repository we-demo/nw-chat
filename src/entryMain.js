
import { showDevTools, openLogin } from './desktop'
import configureStore from './configureStore'

global.store = configureStore()

// 调试
if (process.env.NODE_ENV === 'development') {
  showDevTools()
}

openLogin()

