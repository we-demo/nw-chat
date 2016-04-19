
import { win, openLogin, fixMacMenu, logError } from './desktop'
import configureStore from './configureStore'
import { join } from 'path'

global.store = configureStore()
global.mConsole = console
global.wins = {}

// 调试
if (process.env.NODE_ENV === 'development') {
  win.showDevTools()
}
if (process.env.NW_AUTO === '1') {
  // 加载nwauto安装脚本
  const script = document.createElement('script')
  script.src = join(process.env.NW_AUTO_DIST, 'nw-install-main.js')
  document.body.appendChild(script)
}


// 主进程必须捕获uncaught错误 防止进程出错奔溃
process.on('uncaughtException', (err) => {
  logError('uncaughtException', err)
})
// throw null // test: 如果没捕获则会崩溃
// throw new Error('123') // test


fixMacMenu()

openLogin()

