import React, { Component } from 'react'
import { emojiReplace } from '../Emoji'

export function textToHTML(text) {
  const node = document.createElement('div')
  node.textContent = text
  return node.innerHTML
}

export default class Text extends Component {
  /* eslint-disable react/no-danger */

  render() {
    const { text } = this.props
    let html = textToHTML(text)

    html = emojiReplace(html)

    return (
      <span className="text" dangerouslySetInnerHTML={{ __html: html }}></span>
    )
  }
}
