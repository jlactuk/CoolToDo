<template>
    <form @submit.prevent="checkDataAndSend">
        <h2>Добавление заметки</h2>
        <div class="fieldGroup">
            <label for="title">Название заметки</label>
            <input type="text" id="title" class="FieldItem" placeholder="Введите название" v-model.trim="formData.title"
                maxlength="100">
            <span :class="formData.content.length < 100 ? 'charCounter' : 'errorCounter'">{{ formData.title.length }} /
                100</span>
        </div>
        <div class="fieldGroup">
            <label for="content">Текст заметки</label>
            <textarea placeholder="Введите текст" id="content" class="FieldItem" cols="30" rows="10"
                v-model.trim="formData.content" maxlength="255"></textarea>
            <span :class="formData.content.length < 255 ? 'charCounter' : 'errorCounter'">{{ formData.content.length }}
                / 255</span>
        </div>
        <button class="addNote" :disabled="!access">Добавить</button>
        <button class="closeWindow" @click.prevent.stop="closeWindow()"></button>
    </form>
</template>
<script setup>
import { ref, computed } from 'vue';

const formData = ref({
    title: '',
    content: ''
})
const access = computed(() => {
    return formData.value.title.trim().length > 0 & formData.value.content.trim().length > 0 ? true : false;
})
const emit = defineEmits(['close', 'addItem'])

function closeWindow() {
    emit('close');
}

function checkDataAndSend() {
    if (!formData.value.title.length || !formData.value.content.length) return
    emit('addItem', formData.value);
}

</script>
<style scoped>
span {
    text-align: right;
}

.charCounter {
    color: var(--gray);
}

.errorCounter {
    color: var(--errorColor);
}

.addNote {
    align-self: end;
    margin-right: 10%;
}

textarea {
    word-wrap: break-word;
}

@media screen and (max-width: 550px) {
    .addNote {
        width: 100%;
        margin: 0;
        align-self: center;
    }
}
</style>