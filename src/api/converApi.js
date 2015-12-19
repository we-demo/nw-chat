
import _ from 'lodash'
import Chance from 'chance'
import {
  CONVER_USER, CONVER_GROUP, CONVER_DISCUSS,
  MSG_MIXED, MSG_PIC,
} from '../const'

const chance = new Chance()

// 此api依赖于loadUsers
export function loadConvers() {
  return new Promise((res) => {
    setTimeout(() => {
      let convers = _.times(_.random(6, 14), () => {
        const type = _.sample([ CONVER_USER, CONVER_GROUP, CONVER_DISCUSS ])
        const conver = {
          type,
        }
        if (type === CONVER_USER) {
          const id = _.sample(global.__mockUsers).id
          const msgs = _.times(_.random(4, 8), () => {
            const fromId = _.sample([ id, global.__currUserId ]).id
            return mockMsg(fromId)
          })
          _.assign(conver, {
            id,
            msgs,
          })
        } else {
          const members = _.times(_.random(1, 50), () => {
            return _.sample(global.__mockUsers)
          })
          const msgs = _.times(members.length * 3, () => {
            const fromId = _.sample(members).id
            return mockMsg(fromId)
          })
          _.assign(conver, {
            type,
            id: chance.guid(),
            title: chance.sentence({ words: 3 }),
            // todo: members, msgs拆出来 单独load
            members,
            msgs,
          })
        }
        return conver
      })
      convers = _.mapKeys(convers, 'id')
      res(convers)
    }, 1000)
  })
}

function mockMsg(fromId) {
  const pics = [
    'media/6442809.jpeg',
    'media/AAEAAQAAAAAAAAKdAAAAJDhmYmVjMWUzLTRhZjYtNDAxYi05NGJjLWNiMjIzYjVhOWE4Ng.jpg',
    'media/images.jpeg',
  ]
  const type = _.sample([ MSG_MIXED, MSG_PIC ])
  const msg = {
    type,
    fromId,
    id: chance.guid(),
  }
  if (type === MSG_MIXED) {
    msg.items = _.times(_.random(1, 3), () => {
      return _.random() ? _.sample(pics) : chance.sentence()
    })
  } else if (type === MSG_PIC) {
    msg.pic = _.sample(pics)
  }
  return msg
}
