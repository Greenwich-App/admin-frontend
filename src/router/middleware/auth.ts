import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/userStore';

import type { NavigationGuardNext } from "vue-router";

export default function auth({ next }: { next: NavigationGuardNext }) {
  const { token } = storeToRefs(useUserStore())
  if (!token.value) {
    return next({
      path: '/login',
    })
  }

  return next()
}
