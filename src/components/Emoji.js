import React, { Component } from 'react'
import emoji from 'apple-color-emoji'

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

export default class Emoji extends Component {
  /* eslint-disable react/no-danger */

  render() {
    const { char } = this.props
    const html = emojiReplace(char)
    return (
      <span dangerouslySetInnerHTML={{ __html: html }}></span>
    )
  }
}
