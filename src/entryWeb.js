
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

win.on('loaded', () => {
// setTimeout(() => {
  win.show()
  win.focus()
// }, 500) // 等待加载就绪
})


render(
  <Provider store={store}>
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/home" component={HomePage} />
    </Router>
  </Provider>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development') {
  window.addEventListener('keydown', (ev) => {
    // Cmd+R Ctrl+R 刷新
    if ((ev.metaKey || ev.ctrlKey) && ev.keyCode === 82) {
      win.reload()
    }

    // Cmd+Opt+I 控制台
    if (ev.metaKey && ev.altKey && ev.keyCode === 73) {
      win.showDevTools()
    }
  })
}
