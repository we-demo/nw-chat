
import assert from 'assert'
import _ from 'lodash'
import * as allConst from '../src/const'
// import * as actionTypes from '../src/const/actionTypes'
// import * as chatTypes from '../src/const/chatTypes'

describe('const', () => {

  it('# key: key', () => {

    _.each(allConst, (v, k) => {
      assert.equal(v, k)
    })

  })

  // key的重复无需test 如有重复 export时就会报错
  // Cannot redefine property: XXXXXX
  // it('# no duplicated keys', () => {

  //   assert.equal(
  //     _.keys(allConst).length,
  //     _.keys(actionTypes).length +
  //     _.keys(chatTypes).length
  //   )

  // })

})
