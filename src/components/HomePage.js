
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
import { DDTrigger, DDPanel } from './Dropdown'
import Editor from './Editor'


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

  onMenuClick(e, value) {
    // console.log('onMenuClick', JSON.stringify(value))
    // 不传value表示无效区域 反之则关闭panel
    // react:event 必须持续覆盖赋值
    e.__closePanel = (value != null)
  }

  renderChat() {
    const { state, currConver } = this.props
    const target = converTarget(state, currConver)
    return (
      <div className="home-chat">
        <div className="chat-top">
          <h2>({currConver.type}) {target.name || target.title}</h2>
          <ul className="op-btn-group">
            <li>
              <DDTrigger>
                <div className="op-btn">发送文件</div>
              </DDTrigger>
              <DDPanel>
                <ul className="op-menu">
                  {[
                    { label: '发送文件', value: 'sendfile' },
                    { label: '文件助手', value: 'fileassit' },
                    { label: '无效22222222' },
                  ].map((item) => {
                    const { label, value } = item
                    return (
                      <li key={label} onClick={(e)=>this.onMenuClick(e, value)}>
                        {label}
                      </li>
                    )
                  })}
                </ul>
              </DDPanel>
            </li>
            
          </ul>
        </div>
        <div className="chat-content">
          <div className="chat-main">
            <div className="chat-msgs"></div>
            <div className="chat-editor">
              <Editor />
            </div>
          </div>
          <div className="chat-side">
            <div className="chat-mems"></div>
          </div>
        </div>  
      </div>
    )
  }
}
