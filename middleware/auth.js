export default function ({store, redirect }) {
  if (!store.state.account.user) {
    return redirect('/')
  }
}
