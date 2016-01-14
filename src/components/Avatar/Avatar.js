import React, { Component } from 'react'
import OneAvatar from './OneAvatar'


export default class Avatar extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.target !== this.props.target
  }

  render() {
    const { target } = this.props
    if (target.gender) { // person
      return (
        <div className="avatar">
          <OneAvatar src={target.avatar} />
        </div>
      )
    }
    return ( // group discu
      <div className="avatar avatar-mixed">
        {
          target.avatars.map((avatar, i) => {
            return (
              <OneAvatar key={`${i}_${avatar}`} src={avatar} />
            )
          })
        }
      </div>
    )
  }
}
