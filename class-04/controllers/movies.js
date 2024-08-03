import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAllMovies({ genre })

    res.json(movies)
  }

  static async getMovieByID (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getMovieByID({ id })

    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
  }

  static async createNewMovie (req, res) {
    const resultValidation = validateMovie(req.body)

    if (resultValidation.error) { return res.status(400).json({ error: JSON.parse(resultValidation.error.message) }) }

    const newMovie = await MovieModel.createNewMovie({ input: resultValidation })

    res.status(201).json(newMovie)
  }

  static async updatePartialMovie (req, res) {
    const resultValidation = validatePartialMovie(req.body)

    if (resultValidation.error) { return res.status(400).json({ error: JSON.parse(resultValidation.error.message) }) }

    const { id } = req.params

    const updatedMovie = await MovieModel.updatePartialMovie({ id, input: resultValidation })

    if (updatedMovie === false) return res.status(404).json({ message: 'Movie not found' })

    return res.json(updatedMovie)
  }

  static async deleteMovie (req, res) {
    const { id } = req.params
    const isDeletedMovie = await MovieModel.deleteMovie({ id })

    if (isDeletedMovie === false) return res.status(404).json({ message: 'Movie not found' })

    return res.json({ message: 'Movie deleted successfully' })
  }
}

// Continue to learn on https://www.youtube.com/watch?v=ev3Yxva4wI4&list=PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7&index=5
