import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils.js'

const movies = readJSON('./movies.json')

export class MovieModel {
  static async getAllMovies ({ genre }) {
    if (genre) {
      const filterMovies = movies.filter(
        (movie) => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )

      return filterMovies
    }
    return movies
  }

  static async getMovieByID ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async createNewMovie ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    movies.push(newMovie)

    return newMovie
  }

  static async updatePartialMovie ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false
    movies[movieIndex] = { ...movies[movieIndex], ...input }

    return movies[movieIndex]
  }

  static async deleteMovie ({ id }) {
    const index = movies.findIndex(movie => movie.id === id)
    if (index === -1) return false

    movies.splice(index, 1)
    return true
  }
}
