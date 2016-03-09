import React, { Component } from 'react'
import { filter, clean } from './format'
import { clear, save, restore } from './selection'
import pasteFile from './pasteFile'
import { emojiReplace } from '../Emoji'
import { textToHTML } from '../Msg/Text'


export default class Editor extends Component {

  constructor() {
    super()
    global.editor = this
  }

  focus() {
    this.refs.edit.focus()
  }

  insertHTML(html) {
    this.focus()
    html = emojiReplace(html)
    document.execCommand('insertHTML', 0, html)
  }
  insertText(text) {
    const html = textToHTML(text)
    this.insertHTML(html)
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
      <div ref="edit" contentEditable
        onMouseDown={this.onMouseDown.bind(this)}
        onBlur={this.onBlur.bind(this)}
        onFocus={this.onFocus.bind(this)}
        onPaste={this.onPaste.bind(this)}
        {...this.props} />
    )
  }

}
