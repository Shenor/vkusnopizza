export default ctx => {
  ctx.app.$axios.setHeader('Organization')
  ctx.app.$axios.setHeader('Origin')
}
