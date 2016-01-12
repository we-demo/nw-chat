
import { win, openLogin, fixMacMenu } from './desktop'
import configureStore from './configureStore'

global.store = configureStore()

// 调试
if (process.env.NODE_ENV === 'development') {
  win.showDevTools()
}


fixMacMenu()

openLogin()

