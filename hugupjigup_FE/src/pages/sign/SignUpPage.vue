<template>
  <!-- <v-sheet class="mx-auto" elevation="4" width="300"> -->
    <div class="form-container">

          <div class="divider-text">sign up with credentials</div>

      <v-form ref="formRef">
        <!-- <v-text-field
          v-model="nickname"
          :counter="10"
          :rules="nicknameRules"
          label="Name"
          required
          variant="outlined"
      :error="nicknameError"
      :error-messages="nicknameErrorMsg"
      append-inner-icon="mdi-check-circle"
      clearable
        >
        <template v-slot:append-inner>
        <v-btn variant="text" color="primary" @click="checkNickname">
          중복 확인
        </v-btn>
      </template>
      </v-text-field> -->

        <!-- <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          variant="outlined"
      type="email"
      :error="emailError"
      :error-messages="emailErrorMsg"
      append-inner-icon="mdi-check-circle"
      clearable
        >
        <template v-slot:append-inner>
        <v-btn variant="text" color="primary" @click="checkEmail">
          중복 확인
        </v-btn>
      </template>
    </v-text-field> -->

        <!-- <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          :type="hidePassword ? 'password' : 'text'"
          append-icon="mdi-eye"
            @click:append="togglePassword"
          required
        ></v-text-field> -->
        <div class="input-group">
        <input
        type="text"
        v-model="nickname"
        :placeholder="nicknamePlaceholder"
        class="custom-input"
        @blur="validateField('nickname')"
      />
      <button type="button" class="duplicate-check-btn" @click="checkNickname">
          check
        </button>
        </div>
      <div v-if="nicknameError" class="error-text">{{ nicknameErrorMsg }}</div>

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
          password strength:
          <span :class="strengthColor">{{ passwordStrength }}</span>
        </div>

        <!-- <v-checkbox
          v-model="checkbox"
          :rules="[(v: boolean) => !!v || '진행하려면 약관에 동의해야 합니다.']"
          required
        >
          <template v-slot:label>
            I agree with the&nbsp;
            <a
              href="#"
              target="_blank"
              style="color: blue; text-decoration: underline"
            >
              Privacy Policy </a
            >
          </template>
        </v-checkbox> -->

        <label class="checkbox-container">
        <input type="checkbox" v-model="checkbox" />
        I agree with the <a href="#" target="_blank">Privacy Policy</a>
      </label>

        <!-- <div class="d-flex flex-column">
          <v-btn class="mt-4" color="success" block @click="validate">
            CREATE ACCOUNT
          </v-btn>
        </div> -->

        <div class="button-wrapper">
        <button type="button" class="custom-button" @click="validate">CREATE ACCOUNT</button>
      </div>
      </v-form>

    <!-- </v-sheet> -->
  </div>
</template>

  <script lang="ts" setup>
  import { ref, computed } from 'vue'
  // import { useRouter } from 'vue-router'
  // import axios from 'axios'
  import {isDuplicatedNickname} from "@/usecases/user_usecase";

  // const router = useRouter()
  const formRef = ref()

  const nicknameError = ref(false)
const nicknameErrorMsg = ref('')
const passwordError = ref('')

const nicknamePlaceholder = 'Name'
const passwordPlaceholder = 'Password'

      const nickname = ref<string>('')
        const nicknameRules = [
  (v: string) => !!v || '닉네임을 작성해 주세요',
  (v: string) => v.length <= 10 || '닉네임은 최대 10자 입니다.',
]


      const password = ref<string>('')
        const passwordRules = [
  (v: string) => !!v || '비밀번호를 입력해 주세요.',
  (v: string) =>
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/.test(v) ||
    '비밀번호는 영문, 숫자, 특수 기호를 포함한 최소 8자 이상이여야 합니다.',
]

      const hidePassword = ref<boolean>(true)
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
        case 'weak':   return 'text-weak'
        default:       return ''
      }
    })

    function validateField(field: string): boolean {
  let rules, value, errorRef

  if (field === 'nickname') {
    rules = nicknameRules
    value = nickname.value
    errorRef = nicknameError
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

      const checkbox = ref<boolean>(false)


  // async 추가
  async function validate() {
    console.log('tlqkfsusdi');
  //   const result = await formRef.value?.validate()
  //
  // // // Vuetify 3: validate()는 { valid: true } 형태로 반환될 수 있음
  // // const isValid = typeof result === 'object' ? result.valid : result
  //
  //   if (!result.valid) return

  }

// 닉네임 중복 확인
async function checkNickname() {
  try {
    // const response = await axios.get(`/api/v1/auth/duplicate/email/{email}`, { params: { nickname: nickname.value } })
    const result: boolean = await isDuplicatedNickname(nickname.value);
    if (!result) {
      nicknameError.value = false
      nicknameErrorMsg.value = "사용 가능한 닉네임입니다."
    } else {
      nicknameError.value = true
      nicknameErrorMsg.value = "이미 사용 중인 닉네임입니다."
    }
  } catch (error) {
    console.error(error)
    nicknameError.value = true
    nicknameErrorMsg.value = "중복 확인 중 오류가 발생했습니다."
  }
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
/* ========= 소셜 로그인 버튼 영역 ========= */
.oauth-section {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

/* ========= 소셜 로그인 버튼 ========= */
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

.oauth-button:hover {
  opacity: 0.8;
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

/* ========= 구분 텍스트 ========= */
.divider-text {
  text-align: center;
  color: #555;
  margin-bottom: 16px;
  font-size: 0.9rem;
}

/* ========= 비밀번호 강도 표시 ========= */
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

/* ========= 하단 링크 영역 ========= */
.auth-links {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.85rem;
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

.duplicate-check-btn {
  margin-left: 8px;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background-color: #007bff;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
}

.duplicate-check-btn:hover {
  opacity: 0.9;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
</style>
