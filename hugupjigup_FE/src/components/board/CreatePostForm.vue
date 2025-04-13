<template>
  <div class="page-header">
    <router-link to="/freepostpage" class="breadcrumb-link bold">게시판</router-link>
    <span class="divider">/</span>
    <router-link to="/create-post" class="breadcrumb-link">게시글 작성</router-link>
  </div>

  <v-card class="form-container" elevation="4" ref="formContainer">
    <v-form>
      <!-- 제목 입력 필드 -->
      <div class="custom-title-wrapper">
        <v-text-field
          v-model="title"
          placeholder="제목을 입력해주세요."
          variant="plain"
          hide-details
          class="title-field"
        ></v-text-field>
        <div class="custom-underline"></div>
      </div>

      <!-- 내용 입력 필드 -->
      <v-textarea
        v-model="content"
        placeholder="내용을 입력해주세요."
        auto-grow
        rows="15"
        variant="plain"
        hide-details
        class="content-textarea"
      ></v-textarea>
    </v-form>
    <!-- 버튼 영역 -->
    <div class="button-wrapper">
      <v-btn color="red" @click="onCancel">취소</v-btn>
      <v-btn color="green" @click="onSubmit">완료</v-btn>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";

const title = ref("");
const content = ref("");
const emit = defineEmits(["form-loaded"]);

// formContainer의 타입을 명시적으로 지정
const formContainer = ref<HTMLElement | null>(null);

const onCancel = () => {
  console.log("취소됨");
};

const onSubmit = () => {
  console.log("제출됨:", {
    title: title.value,
    content: content.value,
  });
};

onMounted(async () => {
  await nextTick();
  if (formContainer.value) {
    // HTMLElement인지 다시 한번 확인
    if (formContainer.value instanceof HTMLElement) {
      requestAnimationFrame(() => {
        if (formContainer.value) {
          emit("form-loaded", formContainer.value.offsetWidth);
        }
      });
    }
  }
});
</script>

<style scoped>
.form-container {
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #f5f5f5; /* 배경색을 밝은 회색으로 변경 */
}

.custom-title-wrapper {
  margin-bottom: 24px;
}

.title-field :deep(input::placeholder) {
  font-weight: bold;
  font-size: 1.5rem;
  color: #525252;
}

.custom-underline {
  height: 2px;
  background-color: #c8c8c8;
  margin-top: 8px;
}

.content-textarea :deep(textarea::placeholder) {
  font-weight: normal;
  font-size: 1rem;
  color: #999;
}

.content-textarea :deep(.v-input__control) {
  background-color: transparent !important;
}

.title-field :deep(.v-input__control),
.content-textarea :deep(.v-input__control) {
  border: none !important;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 0;
}

.page-header {
    width: 100%;
    max-width: 960px;
    margin-bottom: 16px;
    font-size: 1rem;
    color: #ccc;
    display: flex;
    align-items: center;
    gap: 6px;
  }

.divider {
  color: #888;
}

.breadcrumb-link {
  color: #cccccc;
  text-decoration: none;
  transition: color 0.2s;
  font-weight: normal;
}

.breadcrumb-link.bold {
  font-weight: bold;
  color: #ffffff;
}

.breadcrumb-link:hover {
  color: #ffffff;
  text-decoration: underline;
}

/* 제목 입력 글자 색상 */
.title-field :deep(input) {
  color: black;
}

/* 내용 입력 글자 색상 */
.content-textarea :deep(textarea) {
  color: black;
}
</style>
