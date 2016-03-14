import React, { Component } from 'react'
import Text from '../Text'
import Pic from '../Pic'


export default class MixedMsg extends Component {

  render() {
    const { msg } = this.props

    // note: 原本为ul/li结构 后转div/span
    // 为了兼容 Editor/filter的换行处理
    return (
      <div className="mixedMsg">
        {
          msg.items.map((item, i) => {
            if (item.type === 'text') {
              return (
                <span key={i}><Text text={item.text} /></span>
              )
            }
            if (item.type === 'br') {
              return (
                <span key={i}><br /></span>
              )
            }
            if (item.type === 'image') {
              return (
                <span key={i}><Pic src={item.src} /></span>
              )
            }
          })
        }
      </div>
    )
  }
}
