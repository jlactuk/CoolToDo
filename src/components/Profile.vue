<template>
    <div class="profile">
        <p>{{ Email }}</p>
        <div class="avatar" @click="ShowExitButton = !ShowExitButton">
            <img src="../assets/user.png" alt="Avatar">
        </div>
        <div class="exit" v-if="ShowExitButton">
            <button @click="exit">Выйти</button>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../store/UserStore';

const Email = ref('');
const ShowExitButton = ref(false)
const store = useUserStore();

Email.value = store.getEmail();

function exit() {
    store.exitUser()
}
</script>
<style scoped>
.profile {
    display: flex;
    gap: 20px;
    align-items: center;
    position: relative;
}

.avatar {
    height: 3.5em;
    width: 3.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    box-sizing: border-box;
    background-color: #1B2F46;
    border-radius: 50%;
}

img {
    height: 1.5em;
    width: 1.5em;
}

.exit {
    background: #1B2F46;
    box-shadow: 0 0 15px #000A;
    position: absolute;
    top: 130%;
    right: 0px;
    padding: 0 15px;
    height: 117px;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    border-radius: 16px;
    z-index: 2;
}

.exit::before {
    content: '';
    display: block;
    position: absolute;
    top: -8%;
    transform: rotate(45deg);
    width: 1em;
    height: 1em;
    background: inherit;
    right: 10%;
}

.exit button {
    background-color: transparent;
    color: var(--green);

}
</style>