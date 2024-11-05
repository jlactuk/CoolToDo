<template>
    <section class="ToDoList">
        <template v-for="item in ToDoItems" :key="item.id">
            <ToDoItem :data="item" @delete="(id) => removeNote(id)" />
        </template>
        <addIcon class="addToDo" @click="showAddForm = true" />
        <AddToDoItemForm v-if="showAddForm" @close="showAddForm = false" @addItem="(data) => addNote(data)" />
    </section>
</template>
<script setup>
import ToDoItem from "../components/ToDoItem.vue"
import AddToDoItemForm from "../components/AddToDoForm.vue"
import addIcon from '../IconsVue/AddIcon.vue'
import { useUserStore } from '../store/UserStore';
import { useNoteStore } from '../store/NoteStore';
import { onMounted, ref } from 'vue'

const showAddForm = ref(false);
const userStore = useUserStore();
const noteStore = useNoteStore();
const ToDoItems = ref([]);

onMounted(async () => {
    await noteStore.getNotes(userStore.getToken())
    ToDoItems.value = noteStore.Notes;

})

async function addNote(data) {
    await noteStore.addNote(data, userStore.getToken());
    showAddForm.value = false;
}
async function removeNote(id) {
    console.log(id)
    await noteStore.removeNote(id, userStore.getToken());
}
</script>

<style scoped>
.addToDo {
    position: fixed;
    bottom: 2em;
    right: 2em;
    background: 50% 50%;
    background: var(--green);
    background-image: url('../assets/Icons/AddIcon.png');
    background-repeat: no-repeat;
    background-position: 50% 50%;
    padding: 20px;
    border-radius: 50%;
    z-index: 2;
}

.ToDoList {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    padding: 25px 7vw;
}
</style>