import { pb } from '$lib/db/connection'
import { currentUser } from '$lib/stores/user'

pb.authStore.loadFromCookie(document.cookie)
pb.authStore.onChange(() => {
  currentUser.set(pb.authStore.model)
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
}, true)