<template>
  <div class="form-container">
    <div class="divider-text">Sign in with</div>

    <div class="divider-text">Or sign up with credentials</div>

    <form ref="form" @submit.prevent>
      <input
        type="text"
        v-model="nickname"
        :placeholder="nicknamePlaceholder"
        class="custom-input"
        @blur="validateField('nickname')"
      />
      <div v-if="nicknameError" class="error-text">{{ nicknameError }}</div>

      <div class="password-wrapper">
        <input
          :type="hidePassword ? 'password' : 'text'"
          v-model="password"
          :placeholder="passwordPlaceholder"
          class="custom-input"
          @blur="validateField('password')"
        />
        <span class="toggle-password" @click="togglePassword">
          <v-icon color="grey">{{ hidePassword ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
        </span>
      </div>
      <div v-if="passwordError" class="error-text">{{ passwordError }}</div>

      <div class="password-strength">
        password strength: <span :class="strengthColor">{{ passwordStrength }}</span>
      </div>

      <label class="checkbox-container">
        <input type="checkbox" v-model="agree" />
        I agree with the <a href="#" target="_blank">Privacy Policy</a>
      </label>

      <label class="checkbox-container">
        <input type="checkbox" v-model="rememberMe" />
        Remember me
      </label>

      <div class="button-wrapper">
        <button type="button" class="custom-button" @click="login">SIGN IN</button>
      </div>

      <div class="button-wrapper">
        <button type="button" class="custom-button" @click="validate">CREATE ACCOUNT</button>
      </div>

      <div class="auth-links">
        <a href="#">Forgot password?</a>
        <a href="#">Create new account</a>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const form = ref()

const nickname = ref('')
const email = ref('')
const password = ref('')
const agree = ref(false)
const rememberMe = ref(false)
const hidePassword = ref(true)

const nicknameError = ref('')
const emailError = ref('')
const passwordError = ref('')

const nicknamePlaceholder = 'Name'
const passwordPlaceholder = 'Password'

const nicknameRules = [
  (v: string) => !!v || '닉네임을 작성해 주세요',
  (v: string) => v.length <= 10 || '닉네임은 최대 10자 입니다.',
]

const emailRules = [
  (v: string) => !!v || '이메일을 입력해 주세요.',
  (v: string) => /.+@.+\..+/.test(v) || '이메일 형식이 올바르지 않습니다.',
]

const passwordRules = [
  (v: string) => !!v || '비밀번호를 입력해 주세요.',
  (v: string) =>
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/.test(v) ||
    '비밀번호는 영문, 숫자, 특수 기호를 포함한 최소 8자 이상이여야 합니다.',
]

function togglePassword() {
  hidePassword.value = !hidePassword.value
}

const passwordStrength = computed(() => {
  if (!password.value) return ''
  if (password.value.length >= 8) return 'strong'
  if (password.value.length >= 4) return 'medium'
  return 'weak'
})

const strengthColor = computed(() => {
  switch (passwordStrength.value) {
    case 'strong': return 'text-strong'
    case 'medium': return 'text-medium'
    case 'weak': return 'text-weak'
    default: return ''
  }
})

function validateField(field: string): boolean {
  let rules, value, errorRef

  if (field === 'nickname') {
    rules = nicknameRules
    value = nickname.value
    errorRef = nicknameError
  } else if (field === 'email') {
    rules = emailRules
    value = email.value
    errorRef = emailError
  } else if (field === 'password') {
    rules = passwordRules
    value = password.value
    errorRef = passwordError
  } else return true

  for (const rule of rules) {
    const result = rule(value)
    if (result !== true) {
      errorRef.value = result
      return false
    }
  }
  errorRef.value = ''
  return true
}

function validateAll(): boolean {
  return (
    validateField('nickname') &&
    validateField('email') &&
    validateField('password')
  )
}

// CREATE ACCOUNT
async function validate() {
  const allValid = validateAll()

  if (!agree.value) {
    alert('약관에 동의해야 합니다.')
    return
  }

  if (!allValid) {
    alert('입력값이 올바르지 않습니다.')
    return
  }

  alert('회원가입이 정상적으로 처리되었습니다.')
}

// SIGN IN
async function login() {
  const emailValid = validateField('email')
  const passwordValid = validateField('password')

  if (!emailValid || !passwordValid) {
    alert('입력값이 올바르지 않습니다.')
    return
  }

  alert('로그인 성공!')
}
</script>

<style scoped>
.form-container {
  width: 300px;
  margin: 60px auto 0 auto;
  background-color: white;
  border: 1px solid #ccc;
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

.oauth-section {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.oauth-button {
  background-color: black;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
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

.password-strength {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 8px;
}

.text-strong {
  color: green;
}
.text-medium {
  color: orange;
}
.text-weak {
  color: red;
}

.checkbox-container {
  color: black;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 6px 0;
  font-size: 14px;
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

.checkbox-container a {
  color: #007bff;
  text-decoration: underline;
}

.checkbox-container a:hover {
  text-decoration: none;
}

.checkbox-container:last-of-type {
  margin-bottom: 12px;
}

.button-wrapper {
  text-align: center;
}

.custom-button {
  background-color: black;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-block;
  text-align: center;

  width: 160px;
  max-width: 100%;
}

.button-wrapper + .button-wrapper {
  margin-top: 10px;
}

.auth-links {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #aaa;
}

.auth-links a {
  color: #aaa;
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