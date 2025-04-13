<template>
  <v-pagination
    v-model:modelValue="internalPage"
    :length="length"
    @update:modelValue="onPageChange"
  />
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps<{
  modelValue: number;  // 부모로부터 받은 현재 페이지
  length: number;      // 전체 페이지 수
}>();

const emit = defineEmits(['update:modelValue']);

const internalPage = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  internalPage.value = newVal;
});

function onPageChange(newPage: number) {
  internalPage.value = newPage;
  emit('update:modelValue', newPage);
}
</script>


