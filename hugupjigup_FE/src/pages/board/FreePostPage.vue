<template>
  <v-container class="px-6" style="max-width: 1280px; margin: 0 auto;">
    <!-- 상단 바 -->
    <v-row align="center" class="mt-6 mb-4">
      <v-col cols="12" md="6">
        <PageBreadcrumb />
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-end align-center">
        <div class="d-flex align-center" style="gap: 8px; max-width: 650px; width: 100%;">
          <!-- 🔍 검색 바 컴포넌트 -->
          <div style="flex-grow: 1;">
            <SearchActionBar />
          </div>
          <!-- ✍️ 작성 버튼 -->
          <v-btn color="primary" @click="goToWrite">작성</v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- 게시글 리스트 + 페이지네이션 -->
    <v-card class="pa-6 post-card-container" elevation="3" color="white">
      <FreePostList :posts="paginatedPosts" />
      <Pagination
        v-model="currentPage"
        :length="totalPages"
        class="mt-6"
      />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import SearchActionBar from '@/components/common/SearchActionBar.vue' // ✅ 추가된 import
import FreePostList from '@/components/board/FreePostList.vue'
import Pagination from '@/components/common/Pagination.vue'

// 게시글 목록 (임시 데이터)
const allPosts = ref([
  { id: 1, title: '첫 번째 글', content: '내용입니다.' },
  { id: 2, title: '두 번째 글', content: '자유롭게 작성해보세요!' },
  // ...
])

const currentPage = ref(1)
const perPage = 5
const totalPages = computed(() => Math.ceil(allPosts.value.length / perPage))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return allPosts.value.slice(start, start + perPage)
})

const router = useRouter()
const goToWrite = () => {
  router.push('/board/create')
}
</script>

<style scoped>
.post-card-container {
  border-radius: 12px;
  width: 100%;
}
</style>
