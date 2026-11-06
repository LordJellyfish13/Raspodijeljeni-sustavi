export interface Car {
  id: string
  name: string
  year_start: number
  year_end: number
  tagline: string
  summary: string
  variant: string
  engine: string
  power_hp: number
  layout: string
  length_mm: number
  image: string
}

const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '')

// Render's free tier puts the backend to sleep, and waking it takes about a minute. Requests can
// fail outright during that time, so keep retrying for a while before giving up.
const WAKE_UP_WINDOW_MS = 90_000
const RETRY_DELAY_MS = 3_000

export async function fetchCars(): Promise<Car[]> {
  const deadline = Date.now() + WAKE_UP_WINDOW_MS
  let failure: unknown

  do {
    try {
      const response = await fetch(`${API_URL}/api/cars`, {
        signal: AbortSignal.timeout(deadline - Date.now()),
      })
      if (response.ok) return await response.json()

      failure = new Error(`The API responded with status ${response.status}`)
      // A 4xx means the request itself is wrong, so waiting won't help.
      if (response.status < 500) break
    } catch (error) {
      failure = error
    }
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))
  } while (Date.now() < deadline)

  throw failure
}
