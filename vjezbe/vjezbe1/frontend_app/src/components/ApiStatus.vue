<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../api.js'

const status = ref('Provjeravam...')
const ok = ref(null)

async function check() {
  ok.value = null
  // Besplatni Render servis se "uspava" nakon neaktivnosti, prvi zahtjev moze trajati i do minute
  status.value = 'Provjeravam... (prvo budenje servera na Renderu moze potrajati)'
  try {
    const data = await api.health()
    ok.value = true
    status.value = `Server radi (uptime ${Math.round(data.uptime)} s)`
  } catch (err) {
    ok.value = false
    status.value = `Server nedostupan: ${err.message}`
  }
}

onMounted(check)
</script>

<template>
  <section class="status" :class="{ ok: ok === true, error: ok === false }">
    <div>
      <div class="url">API: {{ api.url }}</div>
      <div>{{ status }}</div>
    </div>
    <button @click="check">Provjeri</button>
  </section>
</template>

<style scoped>
.status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  margin-bottom: 24px;
  border-radius: 8px;
  background: #eee;
  font-size: 14px;
}

.url {
  font-family: monospace;
  color: #555;
  word-break: break-all;
}

.status.ok {
  background: #e3f6ec;
}

.status.error {
  background: #fde8e8;
}
</style>
