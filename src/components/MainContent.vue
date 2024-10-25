<template>
    <section v-if="!store.isAuth" class="MainPage">
        <div class="info">
            <h1 class="titleMainPage">Мои заметки</h1>
            <p class="descriptionMainPage">Не забывай о важном храни его в облаке</p>
        </div>
        <img src="../assets/bgMainPage.png" alt="Work" />
        <SignInComponent v-if="openWindow.window === 'SignIn'" @changeForm="(form) => { openWindow.window = form }" />
        <SignUpComponent v-if="openWindow.window === 'SignUp'" @changeForm="(form) => { openWindow.window = form }" />
    </section>

    <section v-else>
        <ToDoList />
    </section>
</template>
<script setup>
import { ref, computed } from 'vue';
import SignInComponent from './LogIn.vue';
import SignUpComponent from './SignUp.vue';
import ToDoList from './ToDoList.vue';
import { useUserStore } from '../store/UserStore';

const store = useUserStore();
const openWindow = defineModel();
const view = computed(() => {
    return openWindow.value.window === 'none' ? '' : openWindow.window + 'Component'
})
</script>
<style scoped>
.MainPage {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    justify-self: center;
    width: 450px;
}

.titleMainPage {
    font-size: 104px;
    font-weight: 900;
    line-height: .8em;
    text-wrap: balance;
    margin: 0;
}

.descriptionMainPage {
    font-size: 2em;
    color: var(--gray);
}

img {
    width: 100%;
    height: fit-content;
}

@media screen and (max-width: 799px) {
    .MainPage {
        grid-template-columns: 1fr;
        box-sizing: border-box;
        padding: 20px 40px;
        gap: 20px;
    }
}

@media screen and (max-width: 550px) {
    .MainPage {
        box-sizing: border-box;
        padding: 20px;
        text-align: center;
        width: fit-content;
    }

    .info {
        width: 100%;
    }

    .titleMainPage {
        font-size: 60px;
    }

    .descriptionMainPage {
        font-size: 24px;
    }
}
</style>