import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createMovieRouter } from './routes/movies.js'

// const movies = require('./movies.json') // Ésta forma de importar .json NO funciona en ES Modules

// 1.- Forma de poder inmportar un JSON en ES Modules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./class-04/movies.json', 'utf-8'))

// 2.- Forma recomendada actualmente para importar un JSON ES Modules --------> Crear nuestro propio require

export const createApp = ({ movieModel }) => {
  const app = express()
  const PORT = process.env.PORT ?? 1234

  app.use(express.json())
  app.use(corsMiddleware())
  app.disable('x-powered-by') // Deshabilitar por temas de seguridad ésta opción que nos permite visualizar la tecnología que se usa en el backend en éste caso Express

  app.use('/movies', createMovieRouter({ movieModel }))

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}
