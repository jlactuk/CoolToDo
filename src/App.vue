<script setup>
import HeaderComponent from './components/Header.vue'

import { ref } from 'vue'

const showWindow = ref({
  window: 'none',
})

</script>

<template>
  <section>
    <HeaderComponent v-model="showWindow" />
    <RouterView v-model="showWindow" />
  </section>
</template>

<style scoped></style>
