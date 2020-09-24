export default ctx => {
  ctx.app.$axios.setHeader('Organization', 'fe470000-906b-0025-bf94-08d85ef15bee')
  ctx.app.$axios.setHeader('Origin', 'http://localhost:3000')
  // ctx.app.$axios.setHeader('Organization', token);
}
