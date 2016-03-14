
import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import emojilib from 'emojilib'
import { saveEditor } from '../actions'
// import { IS_MAC } from '../const'
// import { win } from '../desktop'
import Editor from './Editor'
import Panel from './Panel'
import Emoji from './Emoji'


export default class EditorForm extends Component {

  static propTypes = {
    currConver: PropTypes.object.isRequired,
  };

  constructor() {
    super()
    this.state = {
      isCtrlSend: false,
    }
    this.lastConverId = null
    this.savedRange = null
    this.editorFocused = false
  }

  componentDidMount() {
    // note: 解决mac上 跨窗口不触发editor:blur/focus 需手动触发
    // fixme: 应针对HomeChat绑定 确保editor存在
    // if (IS_MAC) {
    //   win.on('blur', () => this.onBlur())
    //   win.on('focus', () => this.onFocus())
    // }
    this.ifConverChanged()
  }

  componentDidUpdate() {
    this.ifConverChanged()
  }

  ifConverChanged() {
    const { currConver } = this.props
    const { editor } = this.refs
    if (currConver && currConver.targetId !== this.lastConverId) { // 回话切换
      this.lastConverId = currConver.targetId
      const { html } = currConver.editor
      if (html) editor.setHTML(html)
      editor.focus()
      const range = document.createRange() // 指针插入最后
      range.selectNodeContents(editor.refs.edit)
      range.collapse()
      editor.setRange(range)
    }
  }

  saveEditor() {
    const { currConver } = this.props
    const { editor } = this.refs
    this.savedRange = editor.getRange()
    saveEditor(currConver.targetId, editor.getHTML())
  }
  restoreEditor() {
    const range = this.savedRange
    if (range) this.refs.editor.setRange(range)
  }

  onFocus() {
    if (this.editorFocused) return
    this.editorFocused = true
    this.restoreEditor()
  }
  onBlur() {
    if (!this.editorFocused) return
    this.editorFocused = false
    const { editor } = this.refs
    editor.lint()
    this.saveEditor()

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

  render() {
    const { isCtrlSend } = this.state
    return (
      <div>
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
    )
  }
}
