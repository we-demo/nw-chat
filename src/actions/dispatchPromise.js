
const { dispatch } = global.store

export default function dispatchPromise(type, prom) {
  if (!(prom instanceof Promise)) {
    return new Promise((res) => {
      dispatch({ type, payload: prom })
      res(prom)
    })
  }
  return prom
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
