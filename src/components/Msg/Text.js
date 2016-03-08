import React, { Component } from 'react'
import emoji from 'apple-color-emoji'

export function textToHTML(text) {
  const node = document.createElement('div')
  node.textContent = text
  return node.innerHTML
}

export function emojiReplace(html) {
  let _html
  // _html = emoji.replace(html)
  if (!emoji.nativeSupport) {
    _html = html.replace(emoji.regex, (c) => {
      return `<img class="emoji" src="${emoji.getImage(c)}" alt="${c}">`
    })
  }
  return _html
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
