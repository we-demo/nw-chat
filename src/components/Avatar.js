import React, { Component } from 'react'
const holder = 'data:image/gif;base64,R0lGODlhAwADAIAAAP///8zMzCH5BAAAAAAALAAAAAADAAMAAAIEBHIJBQA7'


export default class Avatar extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.src !== this.props.src
  }

  render() {
    return (
      <div className="avatar">
        <img {...this.props} ref="img" className="avatar-img"
          src={this.props.src || holder}
          onError={()=>{
            refs.img.src = 'media/images.jpeg' // 默认图片
          }} />
      </div>
    )
  }
}
