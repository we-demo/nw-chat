
import React, { Component } from 'react'
import {
  loadUsers, loadGroups, loadDiscus,
  loadConvers, userLogin,
} from '../actions'
import { win, openHome } from '../desktop'


function handleLogin() {
  userLogin('test.user', '123')
    .then((user) => {
      console.log('login success', user)
    })
    .catch((err) => {
      console.error(err)
      alert(err.message)
    })
    .then(loadUsers)
    .then(loadGroups)
    .then(loadDiscus)
    .then(loadConvers)
    .then(() => {
      win.close()
      openHome()
    })
    .catch((err) => {
      console.error(err)
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
