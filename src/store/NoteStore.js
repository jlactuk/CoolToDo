import { defineStore } from "pinia"
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


export const useNoteStore = defineStore('Note', () => {
    const Notes = ref([]);
    async function getNotes(accessToken) {
        try {
          const response = await fetch('https://dist.nd.ru/api/notes', {
            headers: {
              'Content-type': 'application/json',
              'Authorization': 'Bearer ' + accessToken
    
            }
          })
    
          const data = await response.json()
          if (data.statusCode) {
            return Array.isArray(data.message)
              ? data.message[0]
              : data.message;
          }
          Notes.value = data;
        }
        catch (error) {
          return 'Ошибка сети, попробуйте позже';
        }
      }
    
      //  Structure of noteData
      //      title : String
      //      content : String
      //     
      async function addNote(noteData, accessToken) {
        try {
          const response = await fetch('https://dist.nd.ru/api/notes', {
            headers: {
              'Content-type': 'application/json',
              'Authorization': 'Bearer ' + accessToken
    
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
          Notes.value.push(data);
        }
        
        catch (error) {
          return 'Ошибка сети, попробуйте позже';
        }
      }
    
      async function removeNote(id, accessToken) {
        try {
          const response = await fetch(`https://dist.nd.ru/api/notes/${id}`, {
            headers: {
              'Content-type': 'application/json',
              'Authorization': 'Bearer ' + accessToken
            },
            method: "DELETE",
          })
          let removedItem = Notes.value.findIndex(item => item.id === id);
          Notes.value.splice(removedItem,1)
        }
        
        catch (error) {
          return 'Ошибка сети, попробуйте позже';
        }
      }

      return { Notes ,getNotes, addNote, removeNote }
})