
import assert from 'assert'
import {
  currUserId,
} from '../src/reducers'
import {
  USER_LOGIN, USER_LOGOUT,
} from '../src/const'

const FOO_BAR = 'FOO_BAR'


describe('reducer', () => {

  describe('#currUserId', () => {

    it('#USER_LOGIN', () => {
      assert.equal(
        currUserId(null, {
          type: USER_LOGIN,
          payload: { id: 'test.user' },
        }),
        'test.user'
      )
    })

    it('#USER_LOGOUT', () => {
      assert.equal(
        currUserId('test.user', {
          type: USER_LOGOUT,
        }),
        null
      )
    })

    it('#FOO_BAR', () => {
      assert.equal(
        currUserId('test.user', {
          type: FOO_BAR,
        }),
        'test.user'
      )
    })

  })

})
