const getters = {
  token: state => state.user.token,
  userId: state => state.user.userId,
  name: state => state.device.name,
  direction: state => state.direction.direction
}
export default getters
