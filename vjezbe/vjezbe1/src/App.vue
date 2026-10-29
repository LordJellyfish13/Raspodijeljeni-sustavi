<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <main>
    <h1>RS Vjezba 1</h1>
    <p>Kliknuto: <strong>{{ count }}</strong> puta</p>
    <button @click="count++">Klikni me</button>
    <button class="reset" @click="count = 0">Reset</button>
  </main>
</template>

<style>
body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: system-ui, sans-serif;
  background: #f4f6f8;
}

main {
  text-align: center;
}

h1 {
  color: #42b883;
}

button {
  font: inherit;
  padding: 10px 20px;
  margin: 0 4px;
  border: none;
  border-radius: 8px;
  background: #42b883;
  color: #fff;
  cursor: pointer;
}

button.reset {
  background: #888;
}
</style>
