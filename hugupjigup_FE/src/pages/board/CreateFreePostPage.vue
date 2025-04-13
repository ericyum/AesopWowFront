<template>
  <v-container style="max-width: 960px; margin: 0 auto;">
    <CreatePostForm @form-loaded="onFormLoaded" />
  </v-container>
</template>

<script setup lang="ts">
import CreatePostForm from '@/components/board/CreatePostForm.vue';

const onFormLoaded = (width: number) => {
  console.log('폼이 로드되었습니다. 너비:', width)
}
</script>
