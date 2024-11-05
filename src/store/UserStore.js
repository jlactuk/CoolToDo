import { defineStore } from "pinia"
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


export const useUserStore = defineStore('user', () => {
  const isAuth = ref(false);
  let email = '';
  let token = 0;
  const router = useRouter()

  function getToken() {
    return token;
  }
  function setData(newToken) {
    if (!newToken) return;
    token = newToken;
    isAuth.value = true;
    router.push('/todo');
  }


  //  Structure data : {
  // email: String,
  // password: String
  // }
  async function SignUp(userData) {
    try {
      const response = await fetch('https://dist.nd.ru/api/reg', {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          confirm_password: userData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (data.statusCode !== 200) {
        return Array.isArray(data.message)
          ? data.message[0]
          : data.message;
      }
      alert('Регистрация успешно прошла');
    } catch (error) {
      return 'Ошибка сети, попробуйте позже';
    }
  }

  async function SignIn(userData) {
    try {
      
      const response = await fetch('https://dist.nd.ru/api/auth', {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      });

      const data = await response.json();
      if (!data.accessToken) {
        return Array.isArray(data.message)
          ? data.message[0]
          : data.message;
      }
      email = userData.email
      setData(data.accessToken);

    } catch (error) {
      console.log(error)
      return 'Ошибка сети, попробуйте позже';
    }
  }

  function getEmail() {
    return email;
  }

  async function exitUser() {
    try {
      
      const response = await fetch(`https://dist.nd.ru/api/auth`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token

        },
        method: "DELETE",
      });
      token = '';
      router.push({path: '/'});
      isAuth.value = false;
    }
    catch (error) {
      return 'Ошибка сети, попробуйте позже';
    }
  }

  return { isAuth, email,getToken, getEmail, setData, SignIn, SignUp, exitUser }
})