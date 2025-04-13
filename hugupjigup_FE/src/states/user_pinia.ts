import {defineStore} from "pinia";
import {getJwtSub} from "@/utils/JwtUtils";
import {getUserInfo} from "@/usecases/user_profile_usecase";
import {type Reactive, reactive, ref} from "vue";
import type {UserInfo} from "@/domain/user_profile";

export const userPinia = defineStore('user',  () => {
  const user = ref<UserInfo>();

  const initUser = async () => {
    console.log('Init User');
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw Error('Token not found');
    }

    const sub = getJwtSub(token);
    const response = await getUserInfo(sub);
    user.value = response;
  }

  const updateUser = (newUser: UserInfo) => {
    user.value = newUser;
  }

  return { user, initUser, updateUser };
});
