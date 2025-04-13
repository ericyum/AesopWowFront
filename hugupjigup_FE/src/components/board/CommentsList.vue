<template>
    <div class="comments-wrapper">
      <div class="comment-count">댓글 {{ comments.length }}</div>
  
      <!-- 댓글 목록 -->
      <v-card v-for="comment in comments" :key="comment.id" class="mb-2">
        <div class="comment-container">
          <v-avatar size="40" class="mr-3">
            <v-img :src="comment.user.profileImage" alt="프로필" aspect-ratio="1" />
          </v-avatar>
  
          <div class="comment-info-container">
            <div class="comment-name">{{ comment.user.name }}</div>
            <div class="comment-content">{{ comment.content }}</div>
            <div class="comment-date">{{ formatDate(comment.createdAt) }}</div>
          </div>
  
          <v-fab
            icon
            location="top right"
            size="small"
            class="comment-fab"
          >
            <v-icon>{{ comment.openDial ? 'mdi-close' : 'mdi-dots-vertical' }}</v-icon>
  
            <v-speed-dial
              v-model="comment.openDial"
              location="left center"
              transition="slide-y-transition"
              activator="parent"
            >
              <v-btn icon color="primary" @click="editComment(comment)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error" @click="deleteComment(comment)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-speed-dial>
          </v-fab>
        </div>
      </v-card>
  
      <!-- 댓글 입력 -->
      <v-card class="comment-input-card">
        <div class="comment-input-container">
          <v-avatar size="40" class="mr-3">
            <v-img :src="currentUser.profileImage" />
          </v-avatar>
          <div class="comment-input-wrapper">
            <div class="textarea-header">{{ currentUser.name }}</div>
            <textarea
              class="native-textarea"
              v-model="newComment"
              placeholder="댓글을 입력해주세요."
            />
          </div>
        </div>
        <v-card-actions>
          <v-btn class="custom-submit-button" @click="submitComment">등록</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  interface User {
    id: string;
    name: string;
    profileImage: string;
  }
  
  interface Comment {
    id: number;
    user: User;
    content: string;
    createdAt: string;
    openDial?: boolean;
  }
  
  const { comments } = defineProps<{ comments: Comment[] }>()
  const emit = defineEmits(['submit-comment', 'edit-comment', 'delete-comment'])
  
  const newComment = ref('')
  const currentUser = ref<User>({
    id: 'me',
    name: '연정',
    profileImage: 'https://picsum.photos/id/1027/40/40',
  })
  
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
  }
  
  const submitComment = () => {
    if (newComment.value.trim()) {
      emit('submit-comment', newComment.value)
      newComment.value = ''
    }
  }
  
  const editComment = (comment: Comment) => {
    emit('edit-comment', comment)
    comment.openDial = false
  }
  
  const deleteComment = (comment: Comment) => {
    emit('delete-comment', comment)
    comment.openDial = false
  }
  </script>
  
  <style scoped>
  .comments-wrapper {
    margin-top: 32px;
  }
  .comment-count {
    font-size: 1rem;
    font-weight: bold;
    color: #444;
    margin-bottom: 16px;
  }
  .comment-container {
    display: flex;
    align-items: flex-start;
    padding: 20px;
    position: relative;
  }
  .comment-info-container {
    flex: 1;
    margin-right: 60px;
  }
  .comment-name {
  font-weight: bold;
  color: white;
  }
  .comment-content {
    margin-top: 4px;
    font-size: 0.95rem;
  }
  .comment-date {
    margin-top: 8px;
    font-size: 0.8rem;
    color: #999;
  }
  .comment-fab {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
  }
  .comment-input-card {
    margin-top: 24px;
  }
  .comment-input-container {
    display: flex;
    align-items: flex-start;
    padding: 16px;
  }
  .comment-input-wrapper {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px 16px;
  }
  .textarea-header {
    font-weight: bold;
    margin-bottom: 8px;
  }
  .native-textarea {
    width: 100%;
    min-height: 80px;
    border: none;
    outline: none;
    resize: none;
    font-size: 1rem;
  }
  .custom-submit-button {
    margin-right: 16px;
    background-color: #0066ff !important;
    color: white !important;
    font-weight: bold;
    text-transform: none;
  }
  </style>
  