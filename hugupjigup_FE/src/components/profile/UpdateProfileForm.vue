<template>
    <div class="form-wrapper">
      <v-card class="form-card" elevation="4" color="white" theme="light">
        <div class="title">기본 프로필 수정</div>

        <div class="avatar-wrapper">
          <v-avatar size="120" class="profile-avatar">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile"
            />
          </v-avatar>
        </div>

        <v-form class="form-fields">
          <v-text-field
            v-model="name"
            placeholder="Name"
            variant="outlined"
            hide-details
            density="comfortable"
            class="rounded-input bold-placeholder"
          ></v-text-field>

        </v-form>

        <!-- 버튼: 카드 내부에 포함 -->
        <div class="button-wrapper">
          <v-btn color="red" block class="rounded-button" @click="onCancel">취소</v-btn>
          <v-btn color="black" block class="rounded-button" @click="onComplete">완료</v-btn>
        </div>
      </v-card>
    </div>
  </template>

  <script lang="ts" setup>
  import { ref } from 'vue'
  import router from "@/router";
  import {onMounted} from "vue";
  import {userPinia} from "@/states/user_pinia";
  import {updateUserInfo} from "@/usecases/user_profile_usecase";

  const name = ref('')
  const email = ref('')
  const password = ref('')

  const userState = userPinia();

  onMounted(async () => {
    console.log(userState.user);

    name.value = userState.user?.nickname ?? 'Nick-name';
    email.value = userState.user?.email ?? 'Email';
  });

  const onCancel = () => {
    router.back();
  }

  const onComplete = async () => {
    const user = userState.user;
    if (user) {
      try {
        await updateUserInfo(user.userId, {
          name: name.value,
          email: email.value,
          password: password.value
        });
      } catch (e) {
        console.error(e);
        alert('프로필 수정에 실패했습니다.');
        return;
      }

      userState.updateUser({ ...user,
        nickname: name.value,
        email: email.value }
      );
      alert('프로필 수정 성공');
      router.push('/profile')
    } else {
      alert('사용자 정보를 찾을 수 없습니다.');
    }
  }

  </script>

  <style scoped>
  .form-wrapper {
    padding-top: 60px; /* 상단 네비게이션 바 고려 */
    padding-bottom: 40px;
    display: flex;
    justify-content: center;
  }

  .form-card {
    width: 360px;
    border-radius: 20px; /* 기존보다 더 부드럽게 */
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); /* 그림자 강조 */
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .avatar-wrapper {
    margin-bottom: 24px;
  }

  .profile-avatar {
    border-radius: 50%;
    overflow: hidden;
  }

  .form-fields {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }

  .button-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* 입력 필드 둥근 스타일 */
  .rounded-input :deep(.v-field) {
    border-radius: 12px;
    background-color: #fff;
  }

  /* placeholder 굵게 */
  .bold-placeholder :deep(::placeholder) {
    font-weight: bold;
    color: #999;
  }

  /* 둥근 버튼 */
  .rounded-button {
    border-radius: 8px;
    font-weight: bold;
  }
  </style>
