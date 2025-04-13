<template>
  <v-app>
    <v-container
      fluid
      class="pa-1 pt-16 d-flex align-center justify-center"
      style="background-color: transparent;">
      <v-card
        elevation="6"
        rounded="lg"
        class="mx-auto"
        max-width="1200px"
        color="white"
        width="100%"
      >
        <v-card-text>
          <v-row align="stretch">

            <!-- 중앙 프로필 정보 -->
            <v-col cols="12" md="4" class="text-center d-flex flex-column align-center justify-center">
  <v-avatar size="150" class="profile-avatar">
    <v-img
      src="https://randomuser.me/api/portraits/women/85.jpg"
      cover
    />
  </v-avatar>
  <div class="mt-2">
    <div class="text-h6 font-weight-bold text-black text-point-name">
      {{ userState.user?.nickname ?? 'Nick Name' }}
    </div>
  </div>
</v-col>

            <!-- 우측 카운트 레이블 -->
            <v-col cols="12" md="4" class="d-flex flex-column justify-center">
              <v-row justify="end" class="mt-4">
                <v-col cols="auto">
                  <v-btn
                    color="rgb(255,0,0)"
                    rounded="pill"
                    prepend-icon="mdi-logout"
                    @click="doLogout"
                  >
                    Log out
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    color="rgb(0,0,255)"
                    rounded="pill"
                    prepend-icon="mdi-pencil"
                    @click="navigateToUpdateProfile"
                  >
                    Edit
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
// import CountLabel from "@/components/profile/CountLabel.vue";
import router from "@/router";
import { logout } from "@/usecases/user_usecase";
import { userPinia } from "@/states/user_pinia";

const userState = userPinia();

onMounted(async () => {
  await userState.initUser();
});

const doLogout = async () => {
  if (window.confirm("정말로 로그아웃 하시겠습니까?")) {
    const response = await logout();
    if (response) {
      router.replace('/login');
    } else {
      alert('로그아웃에 실패했습니다.');
    }
  }
};

const navigateToUpdateProfile = () => {
  router.push('/update-profile');
};
</script>

<style scoped>
/* 전체 배경색 */
.v-application {
  background-color: #1e293b;
}

/* 카드 그림자 */
.v-card {
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
}

/* 닉네임 색상 */
.text-black {
  color: rgb(0, 0, 0);
}

/* 현재 직무 & 희망 직무 색상 (진한 회색) */
.text-gray-dark {
  color: #4B5563;
}

/* 프로필 이미지 스타일 */
.profile-avatar {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

/* 버튼 */
.v-btn {
  text-transform: none;
}
</style>
