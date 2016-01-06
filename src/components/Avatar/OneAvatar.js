import React, { Component } from 'react'
const holder = 'data:image/gif;base64,R0lGODlhAwADAIAAAP///8zMzCH5BAAAAAAALAAAAAADAAMAAAIEBHIJBQA7'


export default class OneAvatar extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.src !== this.props.src
  }

  render() {
    return (
      <img ref="img" className="avatar-one"
        src={this.props.src || holder}
        onError={()=>{
          this.refs.img.src = 'media/images.jpeg' // 默认图片
        }} />
    )
  }
}
