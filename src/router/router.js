import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../components/MainContent.vue'
import ToDoListView from '../Pages/ToDoList.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/todo', component: ToDoListView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router