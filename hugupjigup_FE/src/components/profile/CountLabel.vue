<template>
  <v-card
    class="clickable-card"
    width="150"
    height="100"
    color="white"
    dark
    @click="navigateToPage"
  >
    <v-card-text class="d-flex flex-column align-center justify-center pa-2">
      <!-- 제목 텍스트: 검은색으로 설정 -->
      <div class="text-h5 font-weight-bold text-center text-black">{{ title }}</div>
      <!-- 숫자 부분의 크기를 키우기 위해 custom 클래스를 적용 -->
      <div class="subtitle-large text-center mt-3">{{ subtitle }}</div> <!-- 숫자 부분 -->
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

// props 정의
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
});

const router = useRouter();

const navigateToPage = () => {
  router.push(`/${props.path}`);
};
</script>

<style scoped>
.clickable-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.clickable-card:hover {
  transform: scale(1.05);
}

/* 숫자 크기 키우기 */
.subtitle-large {
  font-size: 22px; /* px로 숫자 크기 증가 */
   /* 숫자 굵게 */
  color: #6b7280; /* 회색 텍스트 */
}

/* 기본 색상 */
.v-card {
  background-color: white; /* 흰색 배경 */
}
</style>
