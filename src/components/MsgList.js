import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  currConver,
} from '../selectors'
import Msg from './Msg'


@connect((state) => {
  return {
    currConver: currConver(state),
    cachedUsers: state.cachedUsers,
  }
})
export default class MsgList extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.currConver.msgs !== nextProps.currConver.msgs
  }

  render() {
    const { currConver, cachedUsers } = this.props
    return (
      <ul className="msgList">
        {
          currConver.msgs.map((msg) => {
            const from = cachedUsers[msg.fromId]
            return (
              <li key={msg.id}><Msg from={from} msg={msg} /></li>
            )
          })
        }
      </ul>
    )
  }
}
