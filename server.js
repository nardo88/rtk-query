import cors from 'cors'
import express from 'express'
import fs from 'fs/promises'

const app = express()

let db = [
  {
    _id: '1761241375678',
    title: '1',
    description: '2',
    createdAt: 1761241375678,
    updatedAt: 1761241375678,
  },
  {
    _id: '1761241378033',
    title: '1',
    description: '2',
    createdAt: 1761241378033,
    updatedAt: 1761241378033,
  },
  {
    _id: '1761241380076',
    title: '1',
    description: '2',
    createdAt: 1761241380076,
    updatedAt: 1761241380076,
  },
  {
    _id: '1761241381931',
    title: '1',
    description: '2',
    createdAt: 1761241381931,
    updatedAt: 1761241381931,
  },
]

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

app.get('/api/v1/todos', async (req, res) => {
  try {
    const { page = 1, pageCount = 10 } = req.query
    const data = [...db]
      .sort((a, b) => b.createdAt - a.createdAt)
      .splice(pageCount * (page - 1), pageCount)

    res.json({ list: data, total: db.length })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

app.get('/api/v1/todos/:id', async (req, res) => {
  const { id } = req.params

  const current = db.find((i) => i._id === id)
  if (!current) return res.sendStatus(404)

  return res.json(current)
})

app.put('/api/v1/todos/:id', async (req, res) => {
  const { id } = req.params
  const { title, description } = req.body

  db = db.map((i) => (i._id === id ? { ...i, title, description, updatedAt: Date.now() } : i))
  return res.sendStatus(200)
})

app.post('/api/v1/todos', async (req, res) => {
  const { title, description } = req.body

  db.push({
    _id: String(Date.now()),
    title,
    description,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
  return res.sendStatus(200)
})

app.delete('/api/v1/todos/:id', async (req, res) => {
  const { id } = req.params

  db = db.filter((i) => i._id !== id)
  return res.sendStatus(200)
})

app.listen(5000, () => {
  console.log('server started')
})
