<template>
  <v-container class="outer-container">
    <v-card class="inner-container" elevation="4">

      <!-- 게시글 영역 -->
      <v-card class="pa-6 mb-6 post-card">
        <h2 class="text-h5 font-weight-bold mb-4 white--text">{{ post.title }}</h2>
        <p class="text-body-1 white--text">{{ post.content }}</p>
      </v-card>

      <!-- 댓글 컴포넌트 -->
      <CommentsList
        :comments="comments"
        @submit-comment="addComment"
        @delete-comment="deleteComment"
      />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import CommentsList from '@/components/board/CommentsList.vue'

interface User {
  id: string
  name: string
  profileImage: string
}

interface Comment {
  id: number
  user: User
  content: string
  createdAt: string
  openDial?: boolean
}

const route = useRoute()
const postId = Number(route.params.id) || 1

const post = ref({
  id: postId,
  title: `글 제목 ${postId}`,
  content: '이곳은 게시글 상세 페이지입니다.',
})

const comments = ref<Comment[]>([
  {
    id: 1,
    user: {
      id: 'user1',
      name: '연정',
      profileImage: 'https://picsum.photos/id/1027/40/40',
    },
    content: '댓글 예시입니다.',
    createdAt: new Date().toISOString(),
    openDial: false,
  },
])

function addComment(content: string) {
  comments.value.push({
    id: Date.now(),
    user: comments.value[0].user,
    content,
    createdAt: new Date().toISOString(),
    openDial: false,
  })
}

function deleteComment(comment: Comment) {
  comments.value = comments.value.filter((c) => c.id !== comment.id)
}
</script>

<style scoped>
.outer-container {
  max-width: 1000px;
  margin: 40px auto;
}

.inner-container {
  background-color: white;
  border-radius: 16px;
  padding: 24px;
}

.post-card {
  background-color: #1e1e1e;
  border-radius: 16px;
}

.white--text {
  color: white !important;
}
</style>
