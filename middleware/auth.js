export default function ({store, redirect}) {
  if (!store.getters.isisAuthorization) {
    return redirect('/')
  }
}
