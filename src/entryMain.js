
import { win, openLogin, fixMacMenu, logError } from './desktop'
import configureStore from './configureStore'

global.store = configureStore()
global.mConsole = console

// 调试
if (process.env.NODE_ENV === 'development') {
  win.showDevTools()
}


// 主进程必须捕获uncaught错误 防止进程出错奔溃
process.on('uncaughtException', (err) => {
  logError('uncaughtException', err)
})
// throw null // test: 如果没捕获则会崩溃
// throw new Error('123') // test


fixMacMenu()

openLogin()

