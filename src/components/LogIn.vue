<template>
  <form @submit.prevent="SignIn">
    <h3>Вход в ваш аккаунт</h3>

    <div class="fieldGroup">
      <label for="email">Емаил</label>
      <div class="FieldItem email">
        <input type="email" id="email" placeholder="Введите значение" v-model="formData.email" autocomplete="off" />
        <emailIcon />
      </div>
    </div>

    <div class="fieldGroup">
      <label for="password">Пароль</label>
      <div class="FieldItem hidePassword">
        <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="Введите значение" autocomplete="false"
        v-model="formData.password" />
        <component :is="showPassword ? onPasswordIcon : offPasswordIcon" @click="togglePasswordVisibility" />
      </div>
    </div>

    <div class="linkToOtherForm">
      <p>
        У вас нет аккаунта?
        <a href="#" class="link" @click.prevent="changeForm('SignUp')">Зарегистрируйтесь</a>
      </p>
      <button type="submit">Войти</button>
    </div>

    <div class="errorMessage" v-if="Errors">
      <p>{{ Errors }}</p>
    </div>

    <closeIcon class="closeWindow" @click.prevent="changeForm('none')" />
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/UserStore';
import onPasswordIcon from '../IconsVue/onPasswordIcon.vue';
import offPasswordIcon from '../IconsVue/offPasswordIcon.vue';
import emailIcon from '../IconsVue/EmailIcon.vue';
import closeIcon from '../IconsVue/CloseIcon.vue';

const store = useUserStore();
const emit = defineEmits(['changeForm']);
const formData = ref({
  email: '',
  password: '',
});
const Errors = ref('');
const showPassword = ref(false);

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

async function SignIn() {
  Errors.value = await store.SignIn(formData.value);
  if (!Errors.value)
    changeForm('none');
}

function changeForm(formName) {
  emit('changeForm', formName);
}
</script>

<style scoped>
h3 {
  font-size: 3.5em;
  font-weight: 600;
  line-height: 1.5em;
  width: 80%;
  margin: 0.8em 0;
}

.hidePassword {
  cursor: pointer;
  display: flex;
  align-items: center;
}



p {
  color: var(--gray);
  margin: 0;
}

.errorMessage {
  border-radius: 24px;
  padding: 8px 20px;
  width: 80%;
  background-color: #ff74611a;
  color: var(--errorColor);
}

.link {
  color: var(--green);
}

img {
  margin-left: 10px;
  cursor: pointer;
  width: 24px;
  height: 24px;
}

@media screen and (max-width: 799px) {
  h3 {
    font-size: 2.5em;
  }
}

@media screen and (max-width: 550px) {
  form {
    text-align: left;
  }

}
</style>