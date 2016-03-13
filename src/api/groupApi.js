
import _ from 'lodash'
import Chance from 'chance'

const chance = new Chance()

export function loadGroups() {
  return new Promise((res) => {
    setTimeout(() => {
      let groups = _.times(30, () => {
        return mockGroup()
      })
      groups = _.mapKeys(groups, 'id')
      global.__mockGroups = groups
      res(groups)
    }, 50)
  })
}

export function loadDiscus() {
  return new Promise((res) => {
    setTimeout(() => {
      let discus = _.times(30, () => {
        return mockDiscu()
      })
      discus = _.mapKeys(discus, 'id')
      global.__mockDiscus = discus
      res(discus)
    }, 50)
  })
}

function mockGroup() {
  const memberIds = _.sample(
    _.keys(global.__mockUsers),
    _.random(1, 6),
  )
  let adminIds = _.sample(memberIds, Math.min(_.random(1, 3), memberIds.length))
  if (_.random()) { // 一半的概率 自己是admin
    adminIds = _.union(adminIds, global.__currUserId)
  }
  const avatars = _.pluck(_.map(memberIds.slice(0, 4), (id) => {
    return global.__mockUsers[id]
  }), 'avatar')
  for (let i = avatars.length; i < 4; i++) {
    avatars[i] = ''
  }
  const group = {
    id: chance.guid(),
    title: chance.sentence({ words: _.random(1, 4) }),
    memberIds,
    adminIds,
    avatars,
  }
  return group
}

function mockDiscu() {
  const memberIds = _.sample(
    _.keys(global.__mockUsers),
    _.random(1, 4),
  )
  const avatars = _.pluck(_.map(memberIds.slice(0, 4), (id) => {
    return global.__mockUsers[id]
  }), 'avatar')
  for (let i = avatars.length; i < 4; i++) {
    avatars[i] = ''
  }
  const discu = {
    id: chance.guid(),
    title: chance.sentence({ words: _.random(1, 4) }),
    memberIds,
    avatars,
  }
  return discu
}
