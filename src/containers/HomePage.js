
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { loadConvers } from '../actions'
import {
  currUser, listedConvers,
  converTarget,
} from '../selectors'


function mapStateToProps(state) {
  return {
    state,
    currUser: currUser(state),
    listedConvers: listedConvers(state),
  }
}

class HomePage extends Component {

  componentWillMount() {

  }

  render() {
    const { state, currUser, listedConvers } = this.props
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
                  console.log(item, state)
                  const target = converTarget(state, item)
                  return (
                    <li>({item.type}) {target.name || target.title}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className="kite__item kite__item--full">
          Right
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(HomePage)
