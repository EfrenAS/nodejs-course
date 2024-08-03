const express = require('express')
const cors = require('cors')
const crypto = require('node:crypto')
const { validateMovie, validatePartialMovie } = require('./schemas/movies.js')
const app = express()

app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:3000',
      'http://localhost:1234',
      'http://localhost:5500',
      'http://localhost:8080',
      'http://127.0.0.1:5500',
      'https://movies.com',
      'https://midu.dev'
    ]

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})) //  Por defecto pone * para aceptar todas las solicitudes entrantes a nuestro backend
app.use(express.json())

const PORT = process.env.PORT ?? 1234
const movies = require('./movies.json')

/**
 *  CORS PRE-Flight, cuando se hace una petición PUT, PAT o DELETE se requiere una petición especial llamada OPTIONS
*/

app.disable('x-powered-by') // Deshabilitar por temas de seguridad ésta opción que nos permite visualizar la tecnología que se usa en el backend en éste caso Express

app.get('/', (req, res) => {
  res.send('<h1>Hello, World!</h1>')
})

app.get('/movies', (req, res) => {
  //  EJEMPLO DE COMO SOLUCIONAR LOS PROBLEMAS DE CORS
  // const origin = req.header('origin')

  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }

  const { genre } = req.query
  if (genre) {
    const filterMovies = movies.filter(
      (movie) => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )

    return res.json(filterMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)

  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const resultValidation = validateMovie(req.body)

  if (resultValidation.error) { return res.status(400).json({ error: JSON.parse(resultValidation.error.message) }) }

  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...resultValidation.data
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})

/**
 *  PATCH .- Usado para la actualización parcial de un registro
 *
 *  En este ejemplo al hacer la validación parcial con zod los valores se vuevlen opcionales,
 *  ejemplo: Si se quiere modificar un id no se podrá ya que al no estar el valor dentro
 *  de los datos a validarse zod simplemente lo ignora
 */

app.patch('/movies/:id', (req, res) => {
  const resultValidation = validatePartialMovie(req.body)

  if (resultValidation.error) { return res.status(400).json({ error: JSON.parse(resultValidation.error.message) }) }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

  const updateMovie = {
    ...movies[movieIndex],
    ...resultValidation.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
  //  EJEMPLO DE COMO SOLUCIONAR LOS PROBLEMAS DE CORS
  //  res.header('Access-Control-Allow-Origin', '*')
  // const origin = req.header('origin')

  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted successfully' })
})

/**
 *  PUT.- Usado para la actualización completa de un registro
 */

//  EJEMPLO DE COMO SOLUCIONAR LOS PROBLEMAS DE CORS
// app.options('/movies/:id', (req, res) => {
//   const origin = req.header('origin')

//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
//   }

//   res.send(200)
// })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
