<template>
  <CustomHeader :logoUrl="logoUrl" :tabs="tabs" />
  <main>
    <slot />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CustomHeader from "./CustomHeader.vue";

const logoUrl = ref("/hugupjigup.png");

const tabs = ref([
  { name: "freeboard", text: "자유 게시판", to: "/freepostpage" },
  { name: "profile", text: "프로필", to: "/profile" },
]);

onMounted(async () => {
  try {
    const response = await fetch("/api/user");
    const data = await response.json();
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error);
  }
});
</script>
