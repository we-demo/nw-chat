
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  setCurrConver,
} from '../actions'
import {
  currUser, currConver, listedConvers,
  converTarget,
} from '../selectors'


@connect((state) => {
  return {
    state, // fixme
    currUser: currUser(state),
    currConver: currConver(state),
    listedConvers: listedConvers(state),
  }
})
export default class HomePage extends Component {

  render() {
    const { state, currUser, currConver, listedConvers } = this.props
    return (
      <div className="kite kite--fill home">
        <div className="kite__item left">
          <div className="status">
            <p>{currUser.name}</p>
            <p>{currUser.emotion}</p>
          </div>
          <div className="contact">
            <ul>
              {
                _.map(listedConvers, (item) => {
                  const target = converTarget(state, item)
                  return (
                    <li key={target.id} onClick={()=>setCurrConver(target.id)}>
                      ({item.type}) {target.name || target.title}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className="kite__item kite__item--full">
          {
            currConver ? this.renderChat() : <div className="blank"></div>
          }
        </div>
      </div>
    )
  }

  renderChat() {
    const { state, currConver } = this.props
    const target = converTarget(state, currConver)
    return (
      <div>({currConver.type}) {target.name || target.title}</div>
    )
  }
}
