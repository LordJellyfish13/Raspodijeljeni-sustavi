<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const step = ref(1)

const parity = computed(() => (count.value % 2 === 0 ? 'paran' : 'neparan'))
</script>

<template>
  <section class="card counter">
    <h2>Click counter</h2>
    <p class="value" :class="{ negative: count < 0 }">{{ count }}</p>
    <p class="hint">Broj je {{ parity }}</p>
    <div class="buttons">
      <button @click="count -= step">-{{ step }}</button>
      <button @click="count += step">+{{ step }}</button>
      <button @click="count = 0">Reset</button>
    </div>
    <label class="step">
      Korak:
      <select v-model.number="step">
        <option :value="1">1</option>
        <option :value="5">5</option>
        <option :value="10">10</option>
      </select>
    </label>
  </section>
</template>

<style scoped>
.counter {
  text-align: center;
}

.value {
  font-size: 48px;
  font-weight: bold;
  margin: 8px 0 0;
}

.value.negative {
  color: #c00;
}

.hint {
  color: #888;
  margin-top: 0;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.step {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
}
</style>
