<template>
  <div class="header-inner">
    <div class="header-left">
      <img :src="logoUrl" alt="로고" class="logo" />
      <span class="logo-title">AESOP WOW</span>
    </div>
    <nav class="header-tabs">
      <router-link
        v-for="tab in tabs"
        :key="tab.name"
        :to="tab.to"
        class="tab"
      >
        {{ tab.text }}
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  name: string;
  text: string;
  to: string;
}

interface Props {
  logoUrl: string;
  userName?: string;
  tabs: Tab[];
}

const props = defineProps<Props>();
</script>

<style scoped>
/* ✅ 헤더 전체 컨테이너에서 배경 제거하고 이름 변경 */
.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  color: white;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 60px;
  width: 60px;
  object-fit: contain;
  margin-right: 12px;
}

.logo-title {
  font-size: 24px;
  font-weight: 500;
}

.header-tabs {
  display: flex;
  gap: 30px;
}

.tab {
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
}

.tab:hover {
  text-decoration: underline;
}
</style>
