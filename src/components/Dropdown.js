import React, { Component } from 'react'


// todo: 暂时用css:display:block/none 处理open/close样式
// 将来可能需要通过state/props维护
// 甚至是暴露api 让用户自行定义
function togglePanel(panel) {
  if (panel.style.display === 'none') {
    openPanel(panel)
  }
  else {
    closePanel(panel)
  }
}

function openPanel(panel) {

  // fixme: 侦听window.onClick是不可靠的
  // 一旦event冒泡被禁止 将接收不到
  // 也许需要借助一层overlay
  // 
  const e = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  window.dispatchEvent(e)
  function onGlobalClick() {
    // console.log('onGlobalClick')
    window.removeEventListener('click', onGlobalClick)
    panel.style.display = 'none'
  }
  window.addEventListener('click', onGlobalClick)

  panel.style.display = 'block'
}

function closePanel(panel) {
  panel.style.display = 'none'
}


export class DDTrigger extends Component {

  onTriggerClick(e) {
    e.stopPropagation() // 禁止冒泡至window
    const { trigger } = this.refs
    const panel = trigger.nextElementSibling
        || trigger.previousElementSibling
    togglePanel(panel)
  }

  render() {
    return (
      <div ref="trigger" onClick={(e)=>this.onTriggerClick(e)}>
        {this.props.children}
      </div>
    )
  }
}

export class DDPanel extends Component {

  componentDidMount() {
    if (this.props.open) {
      this.refs.panel.style.display = 'block'
    }
  }

  onPanelClick(e) {
    // console.log('onPanelClick', e.__closePanel)
    e.stopPropagation() // 禁止冒泡至window

    if (e.__closePanel) {
      closePanel(this.refs.panel)
    }
  }

  render() {
    return (
      <div ref="panel" style={{display:'none'}}
          onClick={(e)=>this.onPanelClick(e)}>
        {this.props.children}
      </div>
    )
  }
}
