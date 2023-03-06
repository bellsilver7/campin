<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div>
    기본 레이아웃
    <nav class="flex align-center gap-4 p-4">
      <NuxtLink to="/" class="n-link-base"> 홈 </NuxtLink>
      <NuxtLink to="/campsites" class="n-link-base"> 검색 </NuxtLink>
    </nav>
    <slot />
  </div>
</template>
