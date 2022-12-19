const express = require('express')
const cors = require('cors')

const port = 3500
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('API running')
})

app.get('/download', (req, res) => {
  var text = 'Header0,Header1\nCell0,Cell1'
  res.attachment('filename.txt')
  res.type('txt')
  res.send(text)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

