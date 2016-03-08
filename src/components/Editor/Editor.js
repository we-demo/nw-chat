import React, { Component } from 'react'
import { filter, clean } from './format'
import { clear, save, restore } from './selection'
import { textToHTML, emojiReplace } from '../Msg/Text'


export default class Editor extends Component {

  onPaste(e) {
    // note: 造成editor滚动失效
    e.preventDefault()
    const html = e.clipboardData.getData('text/html')
    const text = e.clipboardData.getData('text/plain')
    // console.log('paste:html', html)
    // console.log('paste:text', text)

    setTimeout(() => { // 解决execCommand递归
      if (html) {
        console.log('html', html)
        const _html = emojiReplace(filter(html))
        console.log('insert:html', _html)
        document.execCommand('insertHtml', 0, _html)
      }
      else if (text) {
        console.log('insert:text', text)
        const _html = emojiReplace(textToHTML(text))
        document.execCommand('insertHtml', 0, _html)
        // document.execCommand('insertText', 0, text)
      }
      clean(this.refs.edit)
    })
  }

  onFocus() {
    restore()
  }

  onBlur() {
    clean(this.refs.edit)
    save(this.refs.edit)

    // 解决win上其他域选中干扰
    clear()
  }

  // 确保选中前clean 不影响选中
  onMouseDown() {
    clean(this.refs.edit)
  }

  render() {
    return (
      <div ref="edit" className="editor" contentEditable
        onMouseDown={this.onMouseDown.bind(this)}
        onBlur={this.onBlur.bind(this)}
        onFocus={this.onFocus.bind(this)}
        onPaste={this.onPaste.bind(this)} />
    )
  }

}
