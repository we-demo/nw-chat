
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { setCurrConver } from '../actions'
import {
  currUser, currConver, listedConvers,
  converTarget,
} from '../selectors'
// import { IS_MAC } from '../const'
// import { win } from '../desktop'
import Panel from './Panel'
import MsgList from './MsgList'
import EditorForm from './EditorForm'
import Avatar from './Avatar'


@connect((state) => {
  return {
    root: state, // fixme
    currUser: currUser(state),
    currConver: currConver(state),
    listedConvers: listedConvers(state),
  }
})
export default class HomePage extends Component {

  render() {
    const { root, currUser, currConver, listedConvers } = this.props
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
                  const target = converTarget(root, item)
                  return (
                    <li key={target.id} className="conver-li"
                      onClick={()=>setCurrConver(target.id)}>
                      <div className="conver-li-icon">
                        <Avatar target={target} />
                      </div>
                      <div className="conver-li-desc">
                        ({item.type}) {target.name || target.title}
                      </div>
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
    const { root, currConver } = this.props
    const target = converTarget(root, currConver)
    return (
      <div className="home-chat">
        <div className="chat-top">
          <h2>({currConver.type}) {target.name || target.title}</h2>
          <ul className="op-btn-group">
            <li>
              <input hidden ref="fileInput" type="file"
                onChange={(e)=>{
                  console.log('file', e.target.files[0])
                  e.target.value = null // reset
                }} />
              <div className="op-btn" onClick={()=>{
                this.refs.filePanel.toggle()
              }}>发送文件</div>
              <Panel ref="filePanel">
                <ul className="op-menu">
                  <li onClick={()=>{
                    this.refs.fileInput.click() // 弹出fileDialog
                  }}>发送文件</li>
                  <li>文件助手</li>
                </ul>
              </Panel>
            </li>
          </ul>
        </div>
        <div className="chat-content">
          <div className="chat-main">
            <div className="chat-msgs">
              <MsgList />
            </div>
            <div className="chat-editor-form">
              <EditorForm currConver={currConver} />
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
