const getters = {
  token: state => state.user.token,
  userId: state => state.user.userId,
  name: state => state.user.name,
  direction: state => state.direction.direction
}
export default getters
