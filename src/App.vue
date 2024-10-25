<script setup>
import HeaderComponent from './components/Header.vue'
import MainCompontent from './components/MainContent.vue';
import { ref } from 'vue'


const showWindow = ref({
  window: 'none',
})

</script>

<template>

  <HeaderComponent v-model="showWindow" />
  <MainCompontent v-model="showWindow" />
</template>

<style scoped></style>
