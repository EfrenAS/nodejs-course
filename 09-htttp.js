const http = require('node:http')
const { findAvailablePort } = require('./10-free-port.js')

console.log(process.env)

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('Requesr received')
  res.end('Hola mundo')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})

//  A simple example of use to http module
// server.listen(0, () => console.log(`Server is running on port http://localhost:${server.address().port}`))
