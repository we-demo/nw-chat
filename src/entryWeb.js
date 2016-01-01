
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import { reloadWindow } from './desktop'
import 'normalize.css'
// import '../lib/kite.min.css'
import './app.scss'

const store = global.store


const root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

render(
  <Provider store={store}>
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/home" component={HomePage} />
    </Router>
  </Provider>,
  root
)

if (process.env.NODE_ENV === 'development') {
  window.addEventListener('keydown', (ev) => {
    // Cmd+R Ctrl+R 刷新
    if ((ev.metaKey || ev.ctrlKey) && ev.keyCode === 82) {
      reloadWindow()
    }
  })
}
