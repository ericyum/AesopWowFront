<template>
    <v-breadcrumbs :items="breadcrumbItems">
      <template v-slot:title="{ item }">
        {{ item.title.toUpperCase() }}
      </template>
    </v-breadcrumbs>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'

  import type { BreadcrumbItem } from '@/types/BreadcrumbItem'
  
  const breadcrumbItems = ref<BreadcrumbItem[]>([
    { title: 'Home', disabled: false, href: '/profile' },
    { title: 'Board', disabled: false, href: '/freepostpage' },
    { title: 'Current Page', disabled: true, href: '#' },
  ])
  </script>
  