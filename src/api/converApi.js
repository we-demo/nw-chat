
import _ from 'lodash'
import Chance from 'chance'
import {
  CONVER_USER, CONVER_GROUP, CONVER_DISCU,
  MSG_MIXED, MSG_PIC,
} from '../const'

const chance = new Chance()

// 此api依赖于loadUsers
export function loadConvers() {
  return new Promise((res) => {
    setTimeout(() => {
      let convers = _.times(_.random(24, 32), () => {
        const type = _.sample([ CONVER_USER, CONVER_GROUP, CONVER_DISCU ])
        let targetId
        let msgs
        if (type === CONVER_USER) {
          targetId = _.sample(global.__mockUsers).id
          msgs = _.times(_.random(4, 8), () => {
            const fromId = _.sample([ targetId, global.__currUserId ])
            return mockMsg(fromId)
          })
        } else if (type === CONVER_GROUP) {
          const group = _.sample(global.__mockGroups)
          const memberIds = group.memberIds
          msgs = _.times(memberIds.length * 3, () => {
            const fromId = _.sample(memberIds)
            return mockMsg(fromId)
          })
          targetId = group.id
        } else if (type === CONVER_DISCU) {
          const discu = _.sample(global.__mockDiscus)
          const memberIds = discu.memberIds
          msgs = _.times(memberIds.length * 3, () => {
            const fromId = _.sample(memberIds)
            return mockMsg(fromId)
          })
          targetId = discu.id
        }
        return {
          type,
          targetId,
          msgs,
        }
      })
      convers = _.mapKeys(convers, 'targetId')
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
  const checked = fromId !== global.__currUserId ? true :
    Math.random() < .3
  const msg = {
    type,
    fromId,
    id: chance.guid(),
    checked,
  }
  if (type === MSG_MIXED) {
    msg.items = _.times(_.random(1, 5), () => {
      const r = Math.random()
      return r < .5 ?  {
        type: 'text', text: chance.sentence() +
          _.sample([ '', '🍎', '😊', '💩', '😂' ]),
      } :
        r < .8 ? { type: 'br' } :
        { type: 'image', src: _.sample(pics) }
    })
  } else if (type === MSG_PIC) {
    msg.pic = _.sample(pics)
  }
  return msg
}
