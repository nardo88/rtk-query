import express from 'express'

const app = express()

app.use(cors())

app.listen(5000, () => {
  console.log('server started')
})
