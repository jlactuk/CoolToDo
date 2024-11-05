<template>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L17 17M17 1L1 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>

</template>

<script setup>

</script>
<style scoped>
svg {
    transform-origin: center;
    animation: shake 2s forwards linear;
}



@keyframes shake {
  0%, 20%, 40%, 60%, 100%
   {
      transform: rotate(0deg)
  }
  10%,50%, 90% {
     transform: rotate(25deg)
  }
  20%, 70% {
    transform: rotate(-25deg)
  }
} 

</style>