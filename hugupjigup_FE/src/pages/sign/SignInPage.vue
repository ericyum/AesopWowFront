<template>
  <div class="form-container">
    <div class="divider-text">sign in with credentials</div>

    <v-form ref="form">
      <!-- 아이디 입력 -->
      <input
        type="text"
        v-model="username"
        placeholder="Username"
        class="custom-input"
        @blur="validateField('username')"
      />
      <div v-if="usernameErrorMsg" class="error-text">{{ usernameErrorMsg }}</div>

      <!-- 비밀번호 입력 -->
      <div class="password-wrapper">
        <input
          :type="hidePassword ? 'password' : 'text'"
          v-model="password"
          placeholder="Password"
          class="custom-input"
          @blur="validateField('password')"
        />
        <span class="toggle-password" @click="togglePassword">
          <v-icon color="grey">{{ hidePassword ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
        </span>
      </div>
      <div v-if="passwordErrorMsg" class="error-text">{{ passwordErrorMsg }}</div>

      <!-- 체크박스 -->
      <label class="checkbox-container">
        <input type="checkbox" v-model="checkbox" />
        Remember me
      </label>

      <!-- 로그인 버튼 -->
      <div class="button-wrapper">
        <button class="custom-button" type="button" @click="login">
          SIGN IN
        </button>
      </div>

      <!-- 링크 -->
      <div class="auth-links">
        <a href="#" class="forgot-password">Forgot password?</a>
        <a href="#" class="create-account" @click.prevent="goToSignUp">Create new account</a>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { signIn } from '@/usecases/user_usecase' // 백엔드 API 함수

const form = ref()
const username = ref('')
const password = ref('')
const hidePassword = ref(true)
const checkbox = ref(false)

// 에러 메시지 상태
const usernameErrorMsg = ref('')
const passwordErrorMsg = ref('')

// 토글 비밀번호 보기
function togglePassword() {
  hidePassword.value = !hidePassword.value
}

// blur 시 유효성 검사
function validateField(field: string): boolean {
  if (field === 'username') {
    if (!username.value) {
      usernameErrorMsg.value = '아이디를 입력해 주세요.'
      return false
    } else {
      usernameErrorMsg.value = ''
    }
  }

  if (field === 'password') {
    if (!password.value) {
      passwordErrorMsg.value = '비밀번호를 입력해 주세요.'
      return false
    } else {
      passwordErrorMsg.value = ''
    }
  }

  return true
}

// 로그인 요청
async function login() {
  const isUsernameValid = validateField('username')
  const isPasswordValid = validateField('password')
  if (!isUsernameValid || !isPasswordValid) return

  try {
  const response = await signIn({
    username: username.value,
    password: password.value,
  })

  if (response) {
    router.replace('/profile')
  } else {
    throw new Error('로그인 실패')
  }
} catch (error) {
  console.error(error) // ← eslint 경고 해결
  usernameErrorMsg.value = '아이디가 일치하지 않습니다.'
  passwordErrorMsg.value = '비밀번호가 일치하지 않습니다.'
}
}

function goToSignUp() {
  router.push('/signup')
}
</script>

<style scoped>
.form-container {
  width: 300px;
  margin: 60px auto 0 auto;
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 8px 12px 24px rgba(0, 0, 0, 0.35);
}

.divider-text {
  text-align: center;
  color: #555;
  margin-bottom: 16px;
  font-size: 0.9rem;
}

.custom-input {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 10px;
  font-size: 14px;
  width: 100%;
  margin-bottom: 8px;
  color: black;
}

.password-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 10px;
  cursor: pointer;
  font-size: 15px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 12px 0;
  font-size: 14px;
  color: #000;
}

.checkbox-container input[type='checkbox'] {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #555;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
}

.checkbox-container input[type='checkbox']:checked::after {
  content: '✓';
  position: absolute;
  top: -2px;
  left: 3px;
  font-size: 14px;
  color: #000;
}

.custom-button {
  background-color: #0066ff;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-transform: none;
}

.custom-button:hover {
  background-color: #0052cc;
}

.button-wrapper {
  margin-top: 8px;
}

.auth-links {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  font-size: 0.85rem;
  color: #007bff;
}

.auth-links a {
  color: #007bff;
  text-decoration: underline;
}

.auth-links a:hover {
  text-decoration: none;
}

.error-text {
  color: red;
  font-size: 0.8rem;
  margin-bottom: 4px;
}
</style>
