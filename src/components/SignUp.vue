<template>
  <form @submit.prevent="SignUp">
    <h3>Регистрация</h3>

    <div class="fieldGroup">
      <label for="email">Емаил</label>
      <div class="FieldItem email">
        <input type="email" id="email" placeholder="Введите значение" v-model.trim="formData.email" />
      </div>
    </div>

    <div class="fieldGroup">
      <label for="password">Пароль</label>
      <div class="FieldItem hidePassword">
        <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="Введите значение"
          v-model.trim="formData.password" />
        <img :src="showPassword ? '/src/assets/Icons/onPasswordIcon.png' : '/src/assets/Icons/offPasswordIcon.png'"
          alt="Toggle Password Visibility" @click="togglePasswordVisibility" />
      </div>
    </div>

    <div class="fieldGroup">
      <label for="confirmPassword">Пароль ещё раз</label>
      <div class="FieldItem hidePassword">
        <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" placeholder="Введите значение"
          v-model.trim="formData.confirmPassword" />
        <img
          :src="showConfirmPassword ? '/src/assets/Icons/onPasswordIcon.png' : '/src/assets/Icons/offPasswordIcon.png'"
          alt="Toggle Confirm Password Visibility" @click="toggleConfirmPasswordVisibility" />
      </div>
    </div>

    <div class="action">
      <p>
        У вас есть аккаунт?
        <a href="#" class="link" @click.prevent="changeForm('SignIn')">Войдите</a>
      </p>
      <button type="submit">Войти</button>
    </div>


    <div class="errorMessage" v-if="Errors">
      <p>{{ Errors }}</p>
    </div>

    <button class="closeWindow" @click.prevent="changeForm('none')"></button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/UserStore';

const store = useUserStore();
const emit = defineEmits(['changeForm']);

const formData = ref({
  email: '',
  password: '',
  confirmPassword: '',
});

const Errors = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

function toggleConfirmPasswordVisibility() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

async function SignUp() {
  if (formData.value.password !== formData.value.confirmPassword) {
    Errors.value = 'Пароли не совпадают';
    return;
  }
  Errors.value = await store.SignUp(formData.value);

  if (!Errors.value)
    changeForm('SignIn');
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
  color: #ff7461;
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
    margin: 0.4em 0;
  }
}
</style>