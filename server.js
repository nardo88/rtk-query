import cors from 'cors'
import express from 'express'
import fs from 'fs/promises'

const app = express()

app.use(
  cors({
    origin: true, // или указать конкретный origin: 'http://localhost:3000'
    credentials: true, // важно, если используете withCredentials: true
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
  })
)
app.use(express.json())

const FILE_PATH = './db.json'

app.get('/api/v1/todos', async (req, res) => {
  try {
    const { page = 1, pageCount = 10 } = req.query

    const list = JSON.parse(await fs.readFile(FILE_PATH, 'utf8'))
    const data = [...list]
      .sort((a, b) => b.createdAt - a.createdAt)
      .splice(pageCount * (page - 1), pageCount)

    res.json({ list: data, total: list.length })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

app.get('/api/v1/todos/:id', async (req, res) => {
  const { id } = req.params

  const list = JSON.parse(await fs.readFile(FILE_PATH, 'utf8'))
  const current = list.find((i) => i._id === id)
  if (!current) return res.sendStatus(404)

  return res.json(current)
})

app.put('/api/v1/todos/:id', async (req, res) => {
  const { id } = req.params
  const { title, description } = req.body

  const list = JSON.parse(await fs.readFile(FILE_PATH, 'utf8'))
  if (!list.find((i) => i._id === id)) return res.sendStatus(404)
  const newData = list.map((i) =>
    i._id === id ? { ...i, title, description, updatedAt: Date.now() } : i
  )
  await fs.writeFile(FILE_PATH, JSON.stringify(newData), 'utf8')
  return res.sendStatus(200)
})

app.post('/api/v1/todos', async (req, res) => {
  const { title, description } = req.body

  const list = JSON.parse(await fs.readFile(FILE_PATH, 'utf8'))
  list.push({
    _id: String(Date.now()),
    title,
    description,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
  await fs.writeFile(FILE_PATH, JSON.stringify(list), 'utf8')
  return res.sendStatus(200)
})

app.delete('/api/v1/todos/:id', async (req, res) => {
  const { id } = req.params

  const list = JSON.parse(await fs.readFile(FILE_PATH, 'utf8'))
  if (!list.find((i) => i._id === id)) return res.sendStatus(404)
  const newData = list.filter((i) => i._id !== id)
  await fs.writeFile(FILE_PATH, JSON.stringify(newData), 'utf8')
  return res.sendStatus(200)
})

app.listen(5000, () => {
  console.log('server started')
})
