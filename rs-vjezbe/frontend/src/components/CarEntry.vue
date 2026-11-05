<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Car } from '@/api/cars'

const props = defineProps<{ car: Car }>()

const photoMissing = ref(false)

const specs = computed(() => [
  { label: 'Built', value: `${props.car.year_start}–${props.car.year_end}` },
  { label: 'Specs for', value: props.car.variant },
  { label: 'Engine', value: props.car.engine },
  { label: 'Power', value: `${props.car.power_hp} hp` },
  { label: 'Layout', value: props.car.layout },
  { label: 'Length', value: `${props.car.length_mm.toLocaleString('en-GB')} mm` },
])
</script>

<template>
  <article :id="car.id" class="entry">
    <div class="photo">
      <img
        v-if="!photoMissing"
        :src="car.image"
        :alt="`Honda ${car.name}`"
        loading="lazy"
        decoding="async"
        @error="photoMissing = true"
      />
      <div v-else class="photo-missing">
        <span class="photo-missing-name">{{ car.name }}</span>
        <span>Photo coming soon</span>
      </div>
    </div>

    <div class="copy">
      <p class="year">{{ car.year_start }}</p>
      <h2>Honda {{ car.name }}</h2>
      <p class="tagline">{{ car.tagline }}</p>
      <p class="summary">{{ car.summary }}</p>

      <dl class="specs">
        <div v-for="spec in specs" :key="spec.label">
          <dt>{{ spec.label }}</dt>
          <dd>{{ spec.value }}</dd>
        </div>
      </dl>
    </div>
  </article>
</template>

<style scoped>
.entry {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  border-top: 1px solid var(--color-border);
  scroll-margin-top: 1rem;
}

.photo {
  position: relative;
  align-self: stretch;
  width: 100%;
  aspect-ratio: 3 / 2;
  background: var(--color-surface);
}

/* Taken out of flow so a tall photo is cropped instead of stretching the row. */
.photo img,
.photo-missing {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.photo img {
  object-fit: cover;
}

.photo-missing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: var(--color-muted);
  text-align: center;
}

.photo-missing-name {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-style: italic;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.copy {
  padding: clamp(1.5rem, 3.5vw, 3rem);
}

.year {
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 5rem);
  font-style: italic;
  font-weight: 700;
  line-height: 0.9;
  color: var(--color-heading);
}

h2 {
  margin-top: 0.5rem;
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-style: italic;
  font-weight: 700;
  line-height: 1.05;
  color: var(--color-heading);
  text-transform: uppercase;
}

.tagline {
  margin-top: 0.4rem;
  font-weight: 600;
  color: var(--color-accent);
}

.summary {
  margin-top: 1rem;
  max-width: 34rem;
}

.specs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem 1.5rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border);
}

dt {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-muted);
  text-transform: uppercase;
}

dd {
  margin: 0.1rem 0 0;
  color: var(--color-heading);
}

@media (max-width: 860px) {
  .entry {
    grid-template-columns: minmax(0, 1fr);
  }

  .copy {
    padding-inline: 16px;
  }
}
</style>
