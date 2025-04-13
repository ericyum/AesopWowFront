import { defineStore } from "pinia";
import { getJwtSub } from "@/utils/JwtUtils";
import { getUserInfo } from "@/usecases/user_profile_usecase";
import { ref } from "vue";
import type { UserInfo } from "@/domain/user_profile";

export const userPinia = defineStore('user', () => {
  const user = ref<UserInfo | null>(null);

  // ✅ 로그인 상태일 때만 요청
  const initUser = async () => {
    console.log('Init User');
    const token = localStorage.getItem('accessToken');
    if (!token) {
      user.value = null;
      return;  // ❗ 에러를 던지지 않고 무시
    }

    try {
      const sub = getJwtSub(token);
      const response = await getUserInfo(sub);
      user.value = response;
    } catch (error) {
      console.warn('유저 정보를 불러오는 데 실패했어요', error);
      user.value = null;
    }
  };

  const updateUser = (newUser: UserInfo) => {
    user.value = newUser;
  };

  return { user, initUser, updateUser };
});
