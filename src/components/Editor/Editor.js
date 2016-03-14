import React, { Component } from 'react'
import { filter, lint } from './format'
import { clearRange, setRange, getRange } from './range'
import pasteFile from './pasteFile'
// import { emojiReplace } from '../Emoji'
// import { escapeHTML } from '../Text'


export default class Editor extends Component {

  constructor() {
    super()
    global.editor = this
  }

  focus() {
    this.refs.edit.blur() // 确保focus有效
    this.refs.edit.focus()
  }

  lint() {
    lint(this.refs.edit)
  }
  clearRange() {
    clearRange()
  }
  getRange() {
    return getRange(this.refs.edit)
  }
  setRange(range) {
    setRange(range)
  }

  getHTML() {
    return this.refs.edit.innerHTML
  }
  setHTML(html) {
    this.refs.edit.innerHTML = html
  }

  insertHTML(html) {
    this.focus()
    // html = emojiReplace(html)
    document.execCommand('insertHTML', 0, html)
  }
  insertText(text) {
    // const html = escapeHTML(text)
    // this.insertHTML(html) // ctrl+enter换行受影响
    this.focus()
    document.execCommand('insertText', 0, text)
  }
  insertImage(src) {
    this.insertHTML(`<img src="${src}">`)
  }

  onPaste(e) {
    // note: 造成editor滚动失效
    e.preventDefault()
    const types = e.clipboardData.types
    const html = e.clipboardData.getData('text/html')
    const text = e.clipboardData.getData('text/plain')
    console.log('paste:html', html)
    // console.log('paste:text', text)

    // 粘贴板内有files 如来自QQ截屏
    if (types && types.indexOf('Files') > -1) {
      pasteFile(e)
      return
    }

    // fixme: use this.insertHTML
    setTimeout(() => { // 解决execCommand递归
      if (html) {
        const _html = filter(html)
        console.log('insert:html', _html)
        this.insertHTML(_html)
        // const _html = emojiReplace(filter(html))
        // console.log('insert:html', _html)
        // document.execCommand('insertHtml', 0, _html)
      }
      else if (text) {
        console.log('insert:text', text)
        this.insertText(text)
        // const _html = emojiReplace(textToHTML(text))
        // document.execCommand('insertHtml', 0, _html)
        // document.execCommand('insertText', 0, text)
      }
      this.lint()
    })
  }

  // 确保选中前lint 不影响选中
  onMouseDown() {
    this.lint()
  }

  render() {
    return (
      <div ref="edit" contentEditable
        onMouseDown={this.onMouseDown.bind(this)}
        onPaste={this.onPaste.bind(this)}
        {...this.props} />
    )
  }

}
