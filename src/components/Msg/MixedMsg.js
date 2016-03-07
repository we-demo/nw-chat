import React, { Component } from 'react'
import Text from './Text'
import Pic from './Pic'


export default class MixedMsg extends Component {

  render() {
    const { msg } = this.props
    return (
      <ul className="mixedMsg">
        {
          msg.items.map((item, i) => {
            if (item.type === 'text') {
              return (
                <li key={i}><Text text={item.text} /></li>
              )
            }
            if (item.type === 'br') {
              return (
                <li key={i}><br /></li>
              )
            }
            if (item.type === 'image') {
              return (
                <li key={i}><Pic src={item.src} /></li>
              )
            }
          })
        }
      </ul>
    )
  }
}
