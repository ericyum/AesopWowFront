<template>
    <div class="posts-list">
      <v-card
        v-for="post in posts"
        :key="post.id"
        class="post-item"
        outlined
        @click="goToPost(post.id)"
      >
        <v-card-title class="post-title">{{ post.title }}</v-card-title>
        <v-card-text class="post-content">
          {{ post.content }}
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import { useRouter } from 'vue-router';
  
  interface FreePost {
    id: number;
    title: string;
    content: string;
  }
  
  const { posts } = defineProps<{ posts: FreePost[] }>();
  
  const router = useRouter();
  
  function goToPost(postId: number) {
    router.push({ path: `/freepostdetailpage/${postId}` }); // ✅ 여기 변경됨
  }
  </script>
  
  <style scoped>
  .posts-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .post-item {
    border-radius: 8px;
    margin: 8px 0;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .post-item:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .post-title {
    font-weight: bold;
    font-size: 18px;
  }
  
  .post-content {
    font-size: 14px;
    color: gray;
  }
  </style>
  