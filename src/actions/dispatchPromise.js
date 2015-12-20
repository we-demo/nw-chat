
const { dispatch } = global.store

export default function dispatchPromise(type, promise) {
  return promise
    .then((payload) => {
      dispatch({ type, payload })
      return payload
    }).catch((err) => {
      // api出错 取消dispatch 可简化reducer判断
      // dispatch({ type, err })
      console.error(`${type} abort`, err.stack)
      throw err
    })
}
