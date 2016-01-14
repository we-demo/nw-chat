import React, { Component } from 'react'


export default class PicMsg extends Component {

  render() {
    const { msg } = this.props
    return (
      <img className="picMsg" src={msg.pic} />
    )
  }
}
