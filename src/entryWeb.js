
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import { win } from './desktop'
import 'normalize.css'
import './app.scss'

const store = global.store


// 将抛出的错误 输出到主console 便于查看
window.addEventListener('error', (ev) => {
  if (console !== global.mConsole) {
    global.mConsole.error(ev.error)
  }
})


win.on('loaded', () => {
// setTimeout(() => {
  win.show()
  win.focus()
// }, 500) // 等待加载就绪
})

if (process.env.NODE_ENV === 'development') {
  window.addEventListener('keydown', (ev) => {
    // Cmd+R Ctrl+R 刷新
    if ((ev.metaKey || ev.ctrlKey) && ev.keyCode === 82) {
      return win.reload()
    }

    // Cmd+Opt+I Ctrl+Shift+I 控制台
    if ((ev.metaKey && ev.altKey || ev.ctrlKey && ev.shiftKey)
      && ev.keyCode === 73) {
      return win.showDevTools()
    }
  })
}

if (process.env.NW_AUTO === '1') {
  // 加载nwauto安装脚本
  const script = document.createElement('script')
  script.src = '../nw-auto/dist/nw-install-web.js'
  document.body.appendChild(script)
}

// render放最后 否则一旦报错即阻塞执行
render(
  <Provider store={store}>
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/home" component={HomePage} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
