import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAllMovies({ genre })

    res.json(movies)
  }

  getMovieByID = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getMovieByID({ id })

    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
  }

  createNewMovie = async (req, res) => {
    const resultValidation = validateMovie(req.body)

    if (resultValidation.error) { return res.status(400).json({ error: JSON.parse(resultValidation.error.message) }) }

    const newMovie = await this.movieModel.createNewMovie({ input: resultValidation })

    res.status(201).json(newMovie)
  }

  updatePartialMovie = async (req, res) => {
    const resultValidation = validatePartialMovie(req.body)

    if (resultValidation.error) { return res.status(400).json({ error: JSON.parse(resultValidation.error.message) }) }

    const { id } = req.params

    const updatedMovie = await this.movieModel.updatePartialMovie({ id, input: resultValidation })

    if (updatedMovie === false) return res.status(404).json({ message: 'Movie not found' })

    return res.json(updatedMovie)
  }

  deleteMovie = async (req, res) => {
    const { id } = req.params
    const isDeletedMovie = await this.movieModel.deleteMovie({ id })

    if (isDeletedMovie === false) return res.status(404).json({ message: 'Movie not found' })

    return res.json({ message: 'Movie deleted successfully' })
  }
}

// Continue to learn on https://www.youtube.com/watch?v=ev3Yxva4wI4&list=PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7&index=5
