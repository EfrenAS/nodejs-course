const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200
    res.end('Bienvenido a mi página de inicio...')
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('Puedes contactarme a través de mi correo electrónico.')
  } else if (req.url === '/image-example.png') {
    fs.readFile('./class-02/example-codesnap.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('500 Internal Server Error')
        console.log(err)
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404
    res.end('Página no encontrada')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server running on port ${desiredPort}`)
})
