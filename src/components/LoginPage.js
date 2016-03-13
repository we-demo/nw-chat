
import React, { Component } from 'react'
import {
  loadUsers, loadGroups, loadDiscus,
  loadConvers, userLogin,
} from '../actions'
import { win, openHome } from '../desktop'


export default class LoginPage extends Component {

  constructor() {
    super()
    this.state = { isLogining: false }
  }

  componentDidMount() {
    this.onLogin() // test
  }

  onLogin() {
    this.setState({ isLogining: true })
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

  render() {
    const { isLogining } = this.state
    return (
      <div>
        <h1>Hello</h1>
        <button onClick={() => {
          this.onLogin()
        }} disabled={isLogining}>
          {isLogining ? 'Logining...' : 'Login'}
        </button>
      </div>
    )
  }
}
