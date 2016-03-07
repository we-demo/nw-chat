import React, { Component } from 'react'
import emoji from 'apple-color-emoji'

function textToHTML(text) {
  const node = document.createElement('div')
  node.textContent = text
  return node.innerHTML
}

export default class Text extends Component {
  /* eslint-disable react/no-danger */

  render() {
    const { text } = this.props
    let html = textToHTML(text)

    // html = emoji.replace(text)
    if (!emoji.nativeSupport) {
      html = text.replace(emoji.regex, (c) => {
        return `<img class="emoji" src="${emoji.getImage(c)}" alt="${c}">`
      })
    }

    return (
      <span className="text" dangerouslySetInnerHTML={{ __html: html }}></span>
    )
  }
}
