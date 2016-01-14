import React, { Component } from 'react'


export default class Panel extends Component {

  constructor() {
    super()
    this.state = { isOpen: false }
  }

  toggle() {
    if (this.state.isOpen) this.close()
    else this.open()
  }

  open() {
    // fixme: 侦听window.onClick是不可靠的
    // 一旦event冒泡被禁止 将接收不到
    // 也许需要借助一层overlay
    const e = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    window.dispatchEvent(e)

    const onGlobalClick = () => {
      // console.log('onGlobalClick')
      window.removeEventListener('click', onGlobalClick)
      this.close()
    }
    // 延时绑定 否则当前click也会触发
    // 似乎react-lite不会 react会
    setTimeout(() => {
      window.addEventListener('click', onGlobalClick)
    }, 0)

    this.refs.panel.style.display = 'block'
    this.setState({ isOpen: true })
  }

  close() {
    this.refs.panel.style.display = 'none'
    this.setState({ isOpen: false })
  }

  onPanelClick(e) {
    // console.log('onPanelClick', e.__closePanel)
    e.stopPropagation() // 禁止冒泡至window

    if (e.__closePanel) {
      this.close()
    }
  }

  getStyle() {
    return { display: this.state.isOpen ? 'block' : 'none' }
  }

  render() {
    return (
      <div ref="panel" style={this.getStyle()}
        onClick={(e)=>this.onPanelClick(e)}>
        {this.props.children}
      </div>
    )
  }
}
