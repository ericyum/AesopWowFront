<template>
  <div class="search-bar-container">
    <!-- 드롭다운 -->
    <div class="custom-select-wrapper">
      <div class="custom-select" @click="toggleDropdown">
        <span class="select-label">{{ selectedLocation }}</span>
        <v-icon size="16" class="arrow">mdi-menu-down</v-icon>

        <ul v-if="dropdownOpen" class="dropdown-menu">
          <li
            v-for="item in locations"
            :key="item"
            @click.stop="selectItem(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 검색창 + 버튼 -->
    <div class="custom-input-wrapper">
      <input
        type="text"
        class="custom-input"
        :placeholder="placeholder"
        v-model="searchValue"
        @keyup.enter="onClick"
      />
      <v-icon class="search-icon" @click="onClick">mdi-magnify</v-icon>

      <!-- ✅ 검색 버튼 추가 -->
      <v-btn
        class="search-button"
        color="primary"
        size="small"
        @click="onClick"
      >
        검색
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedLocation = ref('제목')
const locations = ['제목', '내용', '제목 + 내용', '작성자', '전체']
const dropdownOpen = ref(false)

const searchValue = ref('')
const loading = ref(false)
const loaded = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectItem = (item: string) => {
  selectedLocation.value = item
  dropdownOpen.value = false
  handleSelectChange(item)
}

const handleSelectChange = (value: string) => {
  console.log('선택된 항목:', value)
}

const onClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    loaded.value = true
    console.log('검색 실행:', searchValue.value, '조건:', selectedLocation.value)
  }, 1000)
}

const placeholder = '검색할 내용을 입력하세요.'
</script>

<style scoped>
.search-bar-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.custom-select-wrapper {
  flex: 0 0 160px;
}

.custom-select {
  position: relative;
  width: 160px;
  height: 40px;
  padding: 10px 12px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  color: #000;
}

.select-label {
  color: #000;
  font-size: 14px;
}

.arrow {
  margin-left: 6px;
  color: #000;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 10;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 4px 0;
  margin: 0;
  width: 160px;
  list-style: none;
}

.dropdown-menu li {
  padding: 10px 12px;
  color: #000;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #eee;
}

.custom-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 9999px;
  padding: 0 12px;
  height: 40px;
  background-color: white;
}

.custom-input {
  flex-grow: 1;
  font-size: 14px;
  color: #000;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 6px 0;
}

.search-icon {
  cursor: pointer;
  color: #000;
}

.search-button {
  margin-left: 8px;
  height: 30px;
  font-size: 13px;
  min-width: 60px;
  text-transform: none;
}
</style>
