import express from 'express'
import cors from 'cors'

const app = express()
// Render sam postavlja PORT, lokalno se koristi 3000
const PORT = process.env.PORT || 3000
// CORS_ORIGIN = URL frontenda (npr. https://rs-vjezba1-frontend.onrender.com), '*' dopusta sve
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'

app.use(cors({ origin: CORS_ORIGIN === '*' ? '*' : CORS_ORIGIN.split(',').map((o) => o.trim()) }))
app.use(express.json())

// Podaci se drze u memoriji, pa se resetiraju pri svakom restartu servera
let tasks = [
  { id: 1, text: 'Napraviti Vue aplikaciju', done: true },
  { id: 2, text: 'Deployati backend na Render.com', done: false },
  { id: 3, text: 'Deployati frontend na Render.com', done: false }
]
let nextId = 4

const findTask = (id) => tasks.find((t) => t.id === Number(id))

app.get('/', (req, res) => {
  res.json({ message: 'REST API radi. Pogledaj /api/tasks' })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), time: new Date().toISOString() })
})

app.get('/api/tasks', (req, res) => {
  res.json(tasks)
})

app.get('/api/tasks/:id', (req, res) => {
  const task = findTask(req.params.id)
  if (!task) return res.status(404).json({ error: 'Zadatak nije pronaden' })
  res.json(task)
})

app.post('/api/tasks', (req, res) => {
  const text = req.body?.text?.trim()
  if (!text) return res.status(400).json({ error: 'Polje "text" je obavezno' })
  const task = { id: nextId++, text, done: false }
  tasks.push(task)
  res.status(201).json(task)
})

app.patch('/api/tasks/:id', (req, res) => {
  const task = findTask(req.params.id)
  if (!task) return res.status(404).json({ error: 'Zadatak nije pronaden' })
  if (typeof req.body?.done === 'boolean') task.done = req.body.done
  if (typeof req.body?.text === 'string' && req.body.text.trim()) task.text = req.body.text.trim()
  res.json(task)
})

// Brise sve zavrsene zadatke
app.delete('/api/tasks', (req, res) => {
  tasks = tasks.filter((t) => !t.done)
  res.status(204).end()
})

app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Zadatak nije pronaden' })
  tasks.splice(index, 1)
  res.status(204).end()
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server slusa na portu ${PORT}`)
})
