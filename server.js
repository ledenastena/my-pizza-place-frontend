const path = require('path')
const express = require('express')
const app = express()
const serveStatic = require('serve-static')
const pathToServe = path.join(__dirname, 'dist')
const faviconFilesPath = path.join(__dirname, 'favicon-files')

const port = process.env.PORT || 3000

app.use(serveStatic(pathToServe))
app.use(serveStatic(faviconFilesPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(pathToServe, 'index.html'))
})

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})