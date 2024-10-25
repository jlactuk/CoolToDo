<script setup>
import HeaderComponent from './components/Header.vue'
import MainCompontent from './components/MainContent.vue';
import { ref } from 'vue'

const showWindow = ref({
  window: 'none',
})

</script>

<template>
  <section>
    <HeaderComponent v-model="showWindow" />
    <MainCompontent v-model="showWindow" />
  </section>
</template>

<style scoped></style>
