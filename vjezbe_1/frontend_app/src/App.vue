<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { fetchCars, type Car } from './api/cars'
import CarEntry from './components/CarEntry.vue'

const WAKING_UP_NOTICE_MS = 4_000

const cars = ref<Car[]>([])
const status = ref<'loading' | 'ready' | 'error'>('loading')
const isWakingUp = ref(false)

async function loadCars() {
  status.value = 'loading'
  isWakingUp.value = false
  const wakingUpTimer = setTimeout(() => (isWakingUp.value = true), WAKING_UP_NOTICE_MS)

  try {
    cars.value = await fetchCars()
    status.value = 'ready'

    // The exhibits only exist now, so a #car link in the URL can finally be followed.
    await nextTick()
    document.getElementById(location.hash.slice(1))?.scrollIntoView()
  } catch (error) {
    console.error('Could not load the collection:', error)
    status.value = 'error'
  } finally {
    clearTimeout(wakingUpTimer)
  }
}

onMounted(loadCars)
</script>

<template>
  <header class="masthead">
    <h1>The Little Honda Museum</h1>
    <p class="intro">
      Road cars that shaped Honda, from a 791 cc roadster built by a motorcycle maker to a 2.0-litre
      one that revved to 9,000 rpm. Walk through them in the order they arrived.
    </p>

    <nav v-if="status === 'ready'" aria-label="Cars by launch year">
      <ul>
        <li v-for="car in cars" :key="car.id">
          <a :href="`#${car.id}`">
            <span class="nav-year">{{ car.year_start }}</span>
            {{ car.name }}
          </a>
        </li>
      </ul>
    </nav>
  </header>

  <main>
    <div v-if="status === 'loading'" class="notice" role="status">
      <p class="notice-title">Opening the doors…</p>
      <p v-if="isWakingUp">
        The backend sleeps when nobody is visiting, so this can take about a minute.
      </p>
    </div>

    <div v-else-if="status === 'error'" class="notice" role="alert">
      <p class="notice-title">The museum is closed right now</p>
      <p>The collection couldn’t be loaded from the backend.</p>
      <button type="button" @click="loadCars">Try again</button>
    </div>

    <template v-else>
      <CarEntry v-for="car in cars" :key="car.id" :car="car" />
    </template>
  </main>

  <footer class="colophon">
    <p>
      Unofficial fan project for a university course, not affiliated with Honda Motor Co. Specs
      apply to the version named on each exhibit and vary by market and year.
    </p>
  </footer>
</template>

<style scoped>
.masthead,
.colophon,
.notice {
  padding-inline: clamp(16px, 3vw, 2.5rem);
}

.masthead {
  padding-block: clamp(2rem, 6vw, 4.5rem) clamp(1.5rem, 3vw, 2.5rem);
}

h1 {
  font-family: var(--font-display);
  font-size: clamp(3.25rem, 9.4vw, 8.5rem);
  font-style: italic;
  font-weight: 700;
  line-height: 0.88;
  color: var(--color-heading);
  text-transform: uppercase;
}

.intro {
  max-width: 40rem;
  margin-top: 1.25rem;
  font-size: 1.125rem;
  text-wrap: pretty;
}

nav {
  margin-top: 1.75rem;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.75rem;
  padding: 0;
  list-style: none;
}

nav a {
  display: inline-block;
  padding-block: 0.25rem;
  font-weight: 600;
  color: var(--color-heading);
  text-decoration: none;
  border-bottom: 2px solid transparent;
}

nav a:hover {
  border-bottom-color: var(--color-accent);
}

.nav-year {
  margin-right: 0.25rem;
  font-weight: 500;
  color: var(--color-muted);
}

.notice {
  padding-block: clamp(3rem, 9vw, 6rem);
  border-top: 1px solid var(--color-border);
}

.notice-title {
  margin-bottom: 0.75rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-style: italic;
  font-weight: 700;
  line-height: 1;
  color: var(--color-heading);
  text-transform: uppercase;
}

button {
  margin-top: 1.25rem;
  padding: 0.6rem 1.25rem;
  font: inherit;
  font-weight: 600;
  color: var(--color-heading);
  background: transparent;
  border: 2px solid var(--color-heading);
  cursor: pointer;
}

button:hover {
  color: var(--color-background);
  background: var(--color-heading);
}

.colophon {
  padding-block: 2rem;
  font-size: 0.875rem;
  color: var(--color-muted);
  border-top: 1px solid var(--color-border);
}
</style>
