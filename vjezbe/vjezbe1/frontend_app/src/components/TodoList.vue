<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from '../api.js'

const filters = {
  all: { label: 'Svi', test: () => true },
  active: { label: 'Aktivni', test: (t) => !t.done },
  done: { label: 'Gotovi', test: (t) => t.done }
}

const newTask = ref('')
const tasks = ref([])
const filter = ref('all')
const loading = ref(true)
const error = ref('')

const visibleTasks = computed(() => tasks.value.filter(filters[filter.value].test))
const remaining = computed(() => tasks.value.filter((t) => !t.done).length)
const hasDone = computed(() => tasks.value.some((t) => t.done))

async function run(action) {
  error.value = ''
  try {
    await action()
  } catch (err) {
    error.value = err.message
  }
}

function loadTasks() {
  return run(async () => {
    loading.value = true
    try {
      tasks.value = await api.getTasks()
    } finally {
      loading.value = false
    }
  })
}

function addTask() {
  const text = newTask.value.trim()
  if (!text) return
  return run(async () => {
    tasks.value.push(await api.addTask(text))
    newTask.value = ''
  })
}

function toggleTask(task) {
  return run(async () => {
    const updated = await api.updateTask(task.id, { done: !task.done })
    task.done = updated.done
  })
}

function removeTask(id) {
  return run(async () => {
    await api.deleteTask(id)
    tasks.value = tasks.value.filter((t) => t.id !== id)
  })
}

function clearDone() {
  return run(async () => {
    await api.clearDone()
    tasks.value = tasks.value.filter((t) => !t.done)
  })
}

onMounted(loadTasks)
</script>

<template>
  <section class="card">
    <h2>Zadaci (s API-ja)</h2>

    <form @submit.prevent="addTask">
      <input v-model="newTask" placeholder="Novi zadatak..." />
      <button type="submit">Dodaj</button>
    </form>

    <div class="filters">
      <button
        v-for="(f, key) in filters"
        :key="key"
        :class="{ active: filter === key }"
        @click="filter = key"
      >
        {{ f.label }}
      </button>
    </div>

    <p v-if="error" class="error">Greska: {{ error }}</p>
    <p v-if="loading">Ucitavam zadatke...</p>

    <template v-else>
      <ul>
        <li v-for="task in visibleTasks" :key="task.id" :class="{ done: task.done }">
          <label>
            <input type="checkbox" :checked="task.done" @change="toggleTask(task)" />
            {{ task.text }}
          </label>
          <button class="remove" title="Obrisi" @click="removeTask(task.id)">✕</button>
        </li>
      </ul>
      <p v-if="!visibleTasks.length" class="empty">Nema zadataka.</p>
    </template>

    <div class="footer">
      <span>Preostalo zadataka: {{ remaining }}</span>
      <span class="actions">
        <button :disabled="!hasDone" @click="clearDone">Obrisi gotove</button>
        <button @click="loadTasks">Osvjezi</button>
      </span>
    </div>
  </section>
</template>

<style scoped>
form {
  display: flex;
  gap: 8px;
}

form input {
  flex: 1;
  min-width: 0;
}

.filters {
  display: flex;
  gap: 6px;
  margin-top: 12px;
}

.filters button.active {
  background: #42b883;
  border-color: #42b883;
  color: #fff;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

li.done label {
  text-decoration: line-through;
  color: #999;
}

.remove {
  background: none;
  border: none;
  color: #c00;
}

.empty {
  color: #888;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.actions {
  display: flex;
  gap: 6px;
}

.error {
  color: #c00;
}
</style>
