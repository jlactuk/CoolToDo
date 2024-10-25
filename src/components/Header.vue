<template>
    <header>
        <picture>
            <source media="(max-width: 550px)" srcset="../assets/logoMobile.png" v-if="isAuth">
            <img src="../assets/logo.png" alt="MyNotes" class="logo">
        </picture>
        <button v-if="!isAuth" class="signInButton" @click="openWindow.window = 'SignIn'">Вход</button>
        <Profile v-else />
    </header>
</template>

<script setup>
import { ref, computed, defineModel } from 'vue';
import Profile from "./Profile.vue";
import { useUserStore } from '../store/UserStore'

const store = useUserStore();
const openWindow = defineModel()
const isAuth = computed(() => {
    return store.isAuth;
})

</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 12vw;
}

.signInButton {
    display: flex;
    align-items: center;
    gap: 15px;

}

.signInButton::before {
    content: '';
    width: 24px;
    height: 24px;
    background-image: url('../assets/Icons/SignInIcon.png');
    background-size: 100% 100%;
}

@media screen and (max-width: 799px) {
    header {
        padding: 25px 5vw;
    }
}

@media screen and (max-width: 550px) {
    header {
        padding: 25px 25px;
    }

    .logo {
        width: 100%;
        height: auto;
    }
}
</style>