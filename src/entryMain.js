
import { win, openLogin, fixMacMenu } from './desktop'
import configureStore from './configureStore'


// 禁止主进程reload
win.reload = function () {}
win.reloadDev = function () {}

global.store = configureStore()

// 调试
if (process.env.NODE_ENV === 'development') {
  win.showDevTools()
}


fixMacMenu()

openLogin()

