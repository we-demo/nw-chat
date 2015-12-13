
import * as desktop from './desktop'
import store from './store'

global.store = store

desktop.openWindow('./index.html#/login')

// 调试
desktop.showDevTools()
