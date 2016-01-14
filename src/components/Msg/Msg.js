import React, { Component } from 'react'
import {
  MSG_MIXED, MSG_PIC,
} from '../../const'
import MixedMsg from './MixedMsg'
import PicMsg from './PicMsg'


export default class Msg extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.from !== nextProps.from ||
      this.props.msg !== nextProps.msg
  }

  render() {
    const { from, msg } = this.props
    return (
      <div className="msg">
        <p>{from.name}:</p>
        <div>
          {
            (() => {
              if (msg.type === MSG_MIXED) {
                return <MixedMsg msg={msg} />
              }
              if (msg.type === MSG_PIC) {
                return <PicMsg msg={msg} />
              }
            })()
          }
        </div>
      </div>
    )
  }
}
