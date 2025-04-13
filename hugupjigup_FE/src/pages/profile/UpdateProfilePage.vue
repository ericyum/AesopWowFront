<template>
    <v-container fluid>
      <LogoTap />
      <v-row justify="center">
        <v-col cols="12" md="6" lg="4">
          <UpdateProfileForm />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts" setup>
  import UpdateProfileForm from '@/components/profile/UpdateProfileForm.vue'
  </script>
  
  <style scoped>
  /* 필요 시 스타일 작성 */
  </style>
  