/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { useRoute } from 'vue-router'

import Pagination from '@/components/common/Pagination.vue'
import CreatePostForm from '@/components/board/CreatePostForm.vue'
import UpdateProfileForm from '@/components/profile/UpdateProfileForm.vue'
import CountLabel from '@/components/profile/CountLabel.vue'


import InsertTextForm from '@/components/sign/InsertTextForm.vue'

import Layout from '@/components/common/Layout.vue'
import SearchActionBar from '@/components/common/SearchActionBar.vue'
import CommentsList from '@/components/board/CommentsList.vue'
import CreateCommentForm from '@/components/board/CreateCommentForm.vue'
import FreePostList from '@/components/board/FreePostList.vue'

// Pages
import UpdateProfilePage from '@/pages/profile/UpdateProfilePage.vue'
import CreateFreePostPage from '@/pages/board/CreateFreePostPage.vue'
import SignUpPage from '@/pages/sign/SignUpPage.vue'
import UserProfilePage from '@/pages/profile/UserProfilePage.vue'
import SignInPage from '@/pages/sign/SignInPage.vue'
import FreePostPage from '@/pages/board/FreePostPage.vue'
import FreePostDetailPage from '@/pages/board/FreePostDetailPage.vue'

// Error Pages
import NotFoundPage from '@/pages/error/NotFoundPage.vue'
import NoContent from '@/components/error/NoContent.vue'
import Forbidden from '@/components/error/Forbidden.vue'
import InternalServerError from '@/components/error/InternalServerError.vue'
// import {isExpiredJwt} from "@/utils/JwtUtils";

const routes = [
  // 일반 테스트용 라우트
  { path: '/updateprofileform', component: UpdateProfileForm },
  { path: '/pagination', component: Pagination },
  { path: '/count', component: CountLabel },
  { path: '/insert', component: InsertTextForm },
  { path: '/layout', component:Layout },
  { path: '/actionbar', component:SearchActionBar },
  { path: '/commentslist', component:CommentsList },
  { path: '/createcommentform', component:CreateCommentForm },
  { path: '/createpostform', component: CreatePostForm },
  { path: '/freepostlist', component: FreePostList },


  // 페이지 단위
  { path: '/update-profile', component: UpdateProfilePage },
  { path: '/create-post', component: CreateFreePostPage },
  { path: '/signup', component: SignUpPage },
  { path: '/profile', component: UserProfilePage },
  { path: '/login', component: SignInPage },
  { path: '/freepostpage', component: FreePostPage },
  { path: '/freepostdetailpage/:id', component: FreePostDetailPage, props: true },

  // ✅ 에러 테스트용 라우트 (개발 중 테스트용)
  {
    path: '/test-error/:code',
    name: 'TestError',
    component: {
      template: '<div>에러 테스트 중...</div>',
      setup() {
        const route = useRoute()
        const code = route.params.code
        throw new Error(String(code))
      }
    }
  },

  // 에러 페이지들
  { path: '/notfound', component: NotFoundPage },
  { path: '/nocontent', component: NoContent },
  { path: '/forbidden', component: Forbidden },
  { path: '/internalservererror', component: InternalServerError },

  // catch-all
  { path: '/:pathMatch(.*)*', component: NotFoundPage }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

// // 글로벌 라우터 가드 설정
// router.beforeEach((to, from, next) => {
//   const refreshToken = localStorage.getItem('refreshToken');
//   const isLoggedIn = refreshToken && !isExpiredJwt(refreshToken);

//   // 로그인이 되어 있는 경우
//   if (isLoggedIn) {
//     // 로그인 상태에서 /login 또는 기본 경로로 접근하면 /profile로 리다이렉트
//     if (to.path === '/' || to.path === '/login') {
//       return next({ path: '/profile' });
//     }
//     return next();
//   } else {
//     // 로그인 상태가 아니라면, /login 외의 경로로 접근 시 /login으로 리다이렉트
//     if (to.path === '/login' || to.path === '/signup' || to.path === '/OTP') {
//       return next();
//     }
//     return next('/login');
//   }
// });

export default router
