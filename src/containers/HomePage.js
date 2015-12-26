
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  setCurrConver,
} from '../actions'
import {
  currUser, currConver, listedConvers,
  converTarget,
} from '../selectors'


@connect((state) => {
  return {
    state, // fixme
    currUser: currUser(state),
    currConver: currConver(state),
    listedConvers: listedConvers(state),
  }
})
export default class HomePage extends Component {

  render() {
    const { state, currUser, currConver, listedConvers } = this.props
    return (
      <div className="home-page">
        <div className="home-side">
          <div className="user-status">
            <p>{currUser.name}</p>
            <p>{currUser.emotion}</p>
          </div>
          <div className="contact-nav">
            <ul>
              {
                _.map(listedConvers, (item) => {
                  const target = converTarget(state, item)
                  return (
                    <li key={target.id} onClick={()=>setCurrConver(target.id)}>
                      ({item.type}) {target.name || target.title}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className="home-main">
          {
            currConver ? this.renderChat() : <div className="home-blank"></div>
          }
        </div>
      </div>
    )
  }

  renderChat() {
    const { state, currConver } = this.props
    const target = converTarget(state, currConver)
    return (
      <div className="home-chat">
        <div className="chat-top">
          <h2>({currConver.type}) {target.name || target.title}</h2>
        </div>
        <div className="chat-content">
          <div className="chat-main">
            <div className="chat-msgs"></div>
            <div className="chat-editor"></div>
          </div>
          <div className="chat-side">
            <div className="chat-mems"></div>
          </div>
        </div>  
      </div>
    )
  }
}
