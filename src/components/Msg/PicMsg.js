import React, { Component } from 'react'
import Pic from '../Pic'


export default class PicMsg extends Component {

  render() {
    const { msg } = this.props
    return (
      <Pic src={msg.pic} />
    )
  }
}
