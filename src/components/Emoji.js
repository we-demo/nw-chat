import React, { Component } from 'react'
import emoji from 'apple-color-emoji'

export const emojiList = [
  'smile','blush','smiley','relaxed','smirk','heart_eyes','kissing_heart','kissing_closed_eyes','flushed','relieved','disappointed_relieved','grin','wink','stuck_out_tongue_winking_eye','stuck_out_tongue_closed_eyes','grinning','kissing','kissing_smiling_eyes','stuck_out_tongue','sleeping','worried','frowning','anguished','open_mouth','grimacing','confused','hushed','expressionless','unamused','sweat_smile','sweat','weary','pensive','disappointed','confounded','fearful','cold_sweat','persevere','cry','sob','joy','astonished','scream','tired_face','angry','rage','triumph','sleepy','yum','mask','sunglasses','dizzy_face','imp','smiling_imp','neutral_face','no_mouth','innocent','alien','yellow_heart','blue_heart','purple_heart','heart','green_heart','broken_heart','heartbeat','heartpulse','two_hearts','revolving_hearts','cupid','sparkling_heart','sparkles','star','star2','dizzy','boom','anger','exclamation','question','grey_exclamation','grey_question','zzz','dash','sweat_drops','notes','musical_note','fire','hankey','+1','-1','ok_hand','facepunch','fist','v','wave','open_hands','point_up','point_down','point_left','point_right','raised_hands','pray','point_up_2','clap','muscle', 
]

export function emojiReplace(html) {
  let _html
  // _html = emoji.replace(html)
  // 不管emoji.nativeSupport 一律转换
  _html = html.replace(emoji.regex, (c) => {
    return `<img class="emoji" src="${emoji.getImage(c)}" alt="${c}">`
  })
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
