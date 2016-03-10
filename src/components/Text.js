import React, { Component } from 'react'
import { emojiReplace } from './Emoji'

// export function textToHTML(text) {
//   const node = document.createElement('div')
//   node.textContent = text
//   return node.innerHTML
// }
export function escapeHTML(str) {
  return str.replace(/&/g, '&amp;') // `&`必须最前`
    // .replace(/ /g, '&nbsp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
export function unescapeHTML(str) {
  return str.replace(/&amp;/g, '&')
    // .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

export default class Text extends Component {
  /* eslint-disable react/no-danger */

  render() {
    const { text } = this.props
    let html = escapeHTML(text)

    html = emojiReplace(html)

    return (
      <span className="text" dangerouslySetInnerHTML={{ __html: html }}></span>
    )
  }
}
