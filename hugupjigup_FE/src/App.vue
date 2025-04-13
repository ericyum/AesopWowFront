<template>
  <v-app>
    <v-main>
      <Layout>
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </Layout>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'

// 공통 레이아웃
import Layout from './components/common/Layout.vue'

const router = useRouter()

// 에러 페이지 컴포넌트들 (라우터에서 사용됨 - import 필수)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NotFoundPage from './pages/error/NotFoundPage.vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ForbiddenPage from './pages/error/ForbiddenPage.vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import InternalServerErrorPage from './pages/error/InternalServerErrorPage.vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NoContentPage from './pages/error/NoContentPage.vue'

// 전역 에러 감지 및 라우팅 처리
onErrorCaptured((err: unknown) => {
  console.error('전역 에러 발생:', err)

  if (err instanceof Error) {
        if (err.message.includes('404')) {
      router.push('/notfound')
    } else if (err.message.includes('403')) {
      router.push('/forbidden')
    } else if (err.message.includes('204')) {
      router.push('/nocontent')
    } else if (err.message.includes('500')) {
      router.push('/internalservererror')
    } else {
      router.push('/internalservererror') // fallback
    }
  } else {
    router.push('/internalservererror')
  }

  return false // 에러 전파 중단
})
</script>
