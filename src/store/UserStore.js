import { defineStore } from "pinia"
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const isAuth = ref(false);
  let email = '';
  let token = 0;

  function setData(newToken) {
    if (!newToken) return;
    token = newToken;
    isAuth.value = true;

  }

  // Logic of User


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
      })

      isAuth.value = false;
      accessToken = '';
    }
    catch (error) {
      return 'Ошибка сети, попробуйте позже';
    }
  }


  //  Logic of Notes

  async function getNotes() {
    try {
      const response = await fetch('https://dist.nd.ru/api/notes', {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token

        }
      })

      const data = response.json()
      if (data.statusCode) {
        return Array.isArray(data.message)
          ? data.message[0]
          : data.message;
      }
      return data;

    }
    catch (error) {
      return 'Ошибка сети, попробуйте позже';
    }
  }

  //  Structure of noteData
  //      title : String
  //      content : String
  //     
  async function addNote(noteData) {
    try {
      const response = await fetch('https://dist.nd.ru/api/notes', {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token

        },
        method: "POST",
        body: JSON.stringify({
          title: noteData.title,
          content: noteData.content
        }
        )
      })
      const data = await response.json()

      if (data.statusCode) {
        return Array.isArray(data.message)
          ? data.message[0]
          : data.message;
      }
    }
    catch (error) {
      return 'Ошибка сети, попробуйте позже';
    }
  }

  async function removeNote(id) {
    try {
      const response = await fetch(`https://dist.nd.ru/api/notes/${id}`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: "DELETE",
      })

      const data = await response.json()
      if (data.statusCode) {
        return Array.isArray(data.message)
          ? data.message[0]
          : data.message;
      }
    }
    catch (error) {
      return 'Ошибка сети, попробуйте позже';
    }
  }

  return { isAuth, email, getEmail, setData, SignIn, SignUp, exitUser, getNotes, addNote, removeNote }
})