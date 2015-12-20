
import React, { Component } from 'react'
import { userLogin } from '../actions'
import { openHome, closeWindow } from '../desktop'


function handleLogin() {
  userLogin('test.user', '123')
    .then((user) => {
      console.log('login success', user)
      closeWindow()
      openHome()
    })
    .catch((err) => {
      console.error(err)
      alert(err.message)
    })
}

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }
}
