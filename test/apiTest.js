
import assert from 'assert'
import _ from 'lodash'
import * as api from '../src/api'

describe('api', () => {

  it('#userLogin', () => {

    return api.userLogin('test.user', '123')
      .then((user) => {

        assert(user.id)
        assert(user.name)
        assert(user.gender)
        assert(user.emotion)
        assert(user.email)

      })

  })

  it('#loadUsers', () => {

    return api.loadUsers()
      .then((users) => {

        _.each(_.sample(users, 3), (user) => {
          assert(user.id)
          assert(user.name)
          assert(user.gender)
          assert(user.emotion)
          assert(user.email)
        })

      })

  })

  it('#loadGroups', () => {

    return api.loadGroups()

  })

  it('#loadDiscus', () => {

    return api.loadDiscus()

  })

  it('#loadConvers', () => {

    return api.loadConvers()
      .then((convers) => {

        _.each(_.sample(convers, 3), (conver) => {
          assert(conver.type)
          assert(conver.targetId)
          assert(conver.msgs)

          _.each(_.sample(conver.msgs, 3), (msg) => {
            assert(msg.type)
            assert(msg.id)
            assert(msg.fromId)
          })
        })

      })

  })

})
