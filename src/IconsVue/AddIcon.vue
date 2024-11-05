<template>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 9H17M9 1L9 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>
</template>

<script setup></script>

<style scoped>

svg {
    transform-origin: center;
    animation: spin 1.2s forwards linear;
}



@keyframes spin {
  0%
   {
      transform: rotate(0deg)
  }
  100% {
    transform: rotate(720deg)
  }
} 
</style>