
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import {
  loadUsers, loadGroups, loadDiscus,
  loadConvers, userLogin,
} from '../actions'
import { win, openHome, logError } from '../desktop'


@reduxForm({
  form: 'login',
  fields: [ 'username', 'password' ],
})
export default class LoginPage extends Component {

  constructor() {
    super()
    this.state = { isLogining: false }
  }

  componentDidMount() {
    // this.onLogin() // test
  }

  onLogin() {
    const { username, password } = this.props.fields
    this.setState({ isLogining: true })
    // userLogin('test.user', '123')
    userLogin(username.value, password.value)
      .then((user) => {
        console.log('login success', user)
      })
      .catch((err) => {
        this.setState({ isLogining: false })
        alert(err.message)
        throw new Error('login failed')
      })
      .then(loadUsers)
      .then(loadGroups)
      .then(loadDiscus)
      .then(loadConvers)
      .then(() => {
        // this.setState({ isLogining: false })
        win.close()
        openHome()
      })
      .catch(logError) // 最底
  }

  render() {
    const { isLogining } = this.state
    const { username, password } = this.props.fields
    return (
      <form className="login-page">
        <h1>Hello</h1>
        <input type="text" placeholder="Username..." {...username} />
        <input type="password" placeholder="Password..." {...password} />
        <button type="submit" onClick={() => {
          this.onLogin()
        }} disabled={isLogining}>
          {isLogining ? 'Logining...' : 'Login'}
        </button>
      </form>
    )
  }
}
