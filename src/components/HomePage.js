
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import emojilib from 'emojilib'
import {
  setCurrConver,
} from '../actions'
import {
  currUser, currConver, listedConvers,
  converTarget,
} from '../selectors'
import { IS_MAC } from '../const'
import { win } from '../desktop'
import Panel from './Panel'
import MsgList from './MsgList'
import Editor from './Editor'
import Avatar from './Avatar'
import Emoji from './Emoji'


@connect((state) => {
  return {
    root: state, // fixme
    currUser: currUser(state),
    currConver: currConver(state),
    listedConvers: listedConvers(state),
  }
})
export default class HomePage extends Component {

  constructor() {
    super()
    this.state = {
      isCtrlSend: false,
    }
  }

  componentDidMount() {
    // note: 解决mac上 跨窗口不触发editor/blur 需手动触发
    // fixme: 应针对HomeChat绑定 确保editor存在
    if (IS_MAC) {
      win.on('blur', () => this.onBlur())
    }
  }

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

  onFocus() {
    this.refs.editor.restoreRange()
  }
  onBlur() {
    const { editor } = this.refs
    editor.lint()
    editor.saveRange()

    // 解决win上其他域选中干扰
    editor.clearRange()
  }
  onKeyDown(e) {
    const { isCtrlSend } = this.state
    // note: hasCtrl && !isCtrlSend insert换行
    // 造成editor滚动失效
    if (e.keyCode === 13) {
      const hasCtrl = e.ctrlKey || e.metaKey
      if (hasCtrl ^ isCtrlSend) { // 不一致
        if (hasCtrl) {
          e.preventDefault() // 滚动失效
          this.refs.editor.insertText('\n')
        } // else不处理 采用默认行为
      } else { // 一致
        e.preventDefault()
        this.submitForm()
      }
      return
    }
  }

  submitForm() {
    // todo
    console.log('submitForm')
  }

  renderChat() {
    const { root, currConver } = this.props
    const { isCtrlSend } = this.state
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
            <div className="chat-toolbar">
              <i style={{
                color: isCtrlSend ? 'yellow' : 'inherit',
              }} onClick={()=>{
                this.setState({ isCtrlSend: !isCtrlSend })
              }}>○</i>
              <i onClick={()=>{
                this.refs.emojiPanel.toggle()
                this.refs.editor.focus()
              }}>
                ○
                <Panel ref="emojiPanel">
                  <ul className="emoji-picker" onClick={()=>{
                    this.refs.editor.focus()
                  }}>
                    {
                      // [ '😂', '🍎', '😊', '💩' ]
                      [ 'smile','blush','smiley','relaxed','smirk','heart_eyes','kissing_heart','kissing_closed_eyes','flushed','relieved','disappointed_relieved','grin','wink','stuck_out_tongue_winking_eye','stuck_out_tongue_closed_eyes','grinning','kissing','kissing_smiling_eyes','stuck_out_tongue','sleeping','worried','frowning','anguished','open_mouth','grimacing','confused','hushed','expressionless','unamused','sweat_smile','sweat','weary','pensive','disappointed','confounded','fearful','cold_sweat','persevere','cry','sob','joy','astonished','scream','tired_face','angry','rage','triumph','sleepy','yum','mask','sunglasses','dizzy_face','imp','smiling_imp','neutral_face','no_mouth','innocent','alien','yellow_heart','blue_heart','purple_heart','heart','green_heart','broken_heart','heartbeat','heartpulse','two_hearts','revolving_hearts','cupid','sparkling_heart','sparkles','star','star2','dizzy','boom','anger','exclamation','question','grey_exclamation','grey_question','zzz','dash','sweat_drops','notes','musical_note','fire','hankey','+1','-1','ok_hand','facepunch','fist','v','wave','open_hands','point_up','point_down','point_left','point_right','raised_hands','pray','point_up_2','clap','muscle' ]
                      .map((kw) => {
                        const c = emojilib.lib[kw].char
                        return (
                          <li key={c} onClick={()=>{
                            this.refs.editor.insertHTML(c)
                            this.refs.emojiPanel.close()
                          }}><Emoji char={c} /></li>
                        )
                      })
                    }
                  </ul>
                </Panel>
              </i>
              <i onClick={()=>{
                const src = _.sample([
                  '6442809.jpeg',
                  'AAEAAQAAAAAAAAKdAAAAJDhmYmVjMWUzLTRhZjYtNDAxYi05NGJjLWNiMjIzYjVhOWE4Ng.jpg',
                  'images.jpeg',
                ])
                this.refs.editor.insertImage(`media/${src}`)
              }}>○</i>
            </div>
            <div className="chat-editor"
              onFocus={(e) => this.onFocus(e)}
              onBlur={(e) => this.onBlur(e)}
              onKeyDown={(e) => this.onKeyDown(e)}>
              <Editor ref="editor" className="editor" />
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
