
const { dispatch } = global.store

export default function dispatchPromise(type, promise) {
  return promise
    .then((result) => {
      dispatch({ type, result })
    }).catch((err) =>{
      dispatch({ type, err })
    })
}
