
import _ from 'lodash'
import {
  CONVER_USER,
  CONVER_GROUP,
  CONVER_DISCU,
} from '../const'

export function currConver(state) {
  return state.cachedConvers[state.currConverId]
}

export function listedConvers(state) {
  return _.map(state.listedConverIds, (id) => {
    return state.cachedConvers[id]
  })
}

export function converTarget(state, conver) {
  switch (conver.type) {
    case CONVER_USER:
      return state.cachedUsers[conver.targetId]
    case CONVER_GROUP:
      return state.cachedGroups[conver.targetId]
    case CONVER_DISCU:
      return state.cachedDiscus[conver.targetId]
    default:
      return null
  }
}
