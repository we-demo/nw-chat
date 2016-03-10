import React, { Component } from 'react'


export default class Pic extends Component {

  render() {
    const { src } = this.props
    return (
      <img src={src} />
    )
  }
}
