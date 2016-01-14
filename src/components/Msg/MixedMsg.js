import React, { Component } from 'react'


export default class MixedMsg extends Component {

  render() {
    const { msg } = this.props
    return (
      <ul className="mixedMsg">
        {
          msg.items.map((item, i) => {
            if (item.type === 'text') {
              return (
                <li key={i}><span>{item.text}</span></li>
              )
            }
            if (item.type === 'br') {
              return (
                <li key={i}><br /></li>
              )
            }
            if (item.type === 'image') {
              return (
                <li key={i}><img src={item.src} /></li>
              )
            }
          })
        }
      </ul>
    )
  }
}
