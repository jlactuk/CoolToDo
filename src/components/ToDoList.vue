<template>
    <section class="ToDoList">
        <template v-for="item in ToDoItems" :key="item.id">
            <ToDoItem :data="item" @delete="(id) => removeNote(id)" />
        </template>
        <button class="addToDo" @click="showAddForm = true"></button>
        <AddToDoItemForm v-if="showAddForm" @close="showAddForm = false" @addItem="(data) => addNote(data)" />
    </section>
</template>
<script setup>
import ToDoItem from "./ToDoItem.vue"
import AddToDoItemForm from "./AddToDoForm.vue"
import { useUserStore } from '../store/UserStore';
import { onMounted, ref } from 'vue'

const showAddForm = ref(false);
const store = useUserStore();
const ToDoItems = ref([]);

onMounted(async () => {
    ToDoItems.value = await store.getNotes();
})

async function addNote(data) {
    await store.addNote(data);
    ToDoItems.value = await store.getNotes();
    showAddForm.value = false;
}
async function removeNote(id) {
    await store.removeNote(id);
    ToDoItems.value = await store.getNotes();
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