
export function currUser(state) {
  return state.cachedUsers[state.currUserId]
}
