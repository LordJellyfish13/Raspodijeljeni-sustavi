<script setup>
import ApiStatus from './components/ApiStatus.vue'
import ClickCounter from './components/ClickCounter.vue'
import TodoList from './components/TodoList.vue'
</script>

<template>
  <main class="container">
    <h1>RS Vjezba 1</h1>
    <p class="subtitle">Vue.js frontend (Render Static Site) + Express REST API (Render Web Service).</p>
    <ApiStatus />
    <ClickCounter />
    <TodoList />
  </main>
</template>

<style scoped>
.container {
  max-width: 520px;
  margin: 48px auto;
  padding: 0 16px;
}

.subtitle {
  color: #666;
  margin-top: 0;
}
</style>
