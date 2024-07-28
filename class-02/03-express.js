const express = require('express')

const app = express()

app.disable('x-powered-by') // Por temas de seguridad se sugiere desactivar ésta opción que muestra la tecnología que se está usando como backend

const PORT = process.env.PORT ?? 1234

const dittoJSON = require('./ditto.json')

//  Middleware
app.use(express.json())

//  ESTO ES UN EJEMPLO DE UN MIDDLEWARE SIMILAR A LO QUE HACE EL MIDDLEWARE express.json()
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   //  Sólo llegan request que son POST y que tienen el header Content-Type: application/json
//   let body = ''

//   // Escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })
//   // Escuchar el evento end
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     req.body = data
//     next()
//   })
// })

// Home Page
app.get('/', (req, res) => {
  res.send('<h1>Mi Página</h1>')
})

// List details a specific pokemon
app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON)
})

// Create a Pokemon
app.post('/pokemon', (req, res) => {
  res.json(req.body)
})

//  Se puede usar para todas las rutas que se quieran accesar y no esten dentro de las rutas
//  y así para todas ellas devolver un 404

app.use((req, res) => {
  res.status(404).send('<h1>404 - Not Found :(<h1>')
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
