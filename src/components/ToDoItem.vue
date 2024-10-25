<template>
    <article class="item">
        <h3 class="title">{{ props.data.title }}</h3>
        <p class="content">{{ props.data.content }}</p>
        <button class="deleteNote" @click="removeItem(props.data.id)">Удалить</button>
    </article>
</template>
<script setup>
const props = defineProps(['data'])
const emit = defineEmits(['delete'])

function removeItem(id) {
    emit('delete', id)
}
</script>

<style scoped>
.item {
    background: var(--green);
    padding: 15px;
    border-radius: 12px;
    display: flex;
    flex-basis: 400px;
    height: fit-content;
    flex-direction: column;
    position: relative;
}

.item::before {
    content: '';
    width: 40px;
    height: 40px;
    background: linear-gradient(45deg, #A5BB0C 50%, #0A1F38 50%);
    border-bottom-left-radius: 16px;
    position: absolute;
    top: 0;
    right: 0;
}

.title {
    min-height: 50px;
    font-size: 2em;
    border-bottom: 2px dotted #ccc;
    margin: 0;
}

.deleteNote {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    background: transparent;
    padding: 0;
    align-self: end;
}

.deleteNote::before {
    content: '';
    background-image: url('../assets/Icons/CloseIcon.png');
    background-size: 75% 75%;
    background-position: 0 50%;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    display: block;
}

@media screen and (max-width: 1440px) {
    .item {
        flex-basis: 300px;
    }
}

@media screen and (max-width: 799px) {
    .item {
        flex-basis: 100%;
    }
}
</style>