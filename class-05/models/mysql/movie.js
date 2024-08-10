import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'Fu11St@ck',
  database: 'moviesweb'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class MovieModel {
  /*
  * Obtener todas las películas
   */
  static async getAllMovies ({ genre }) {
    let query = 'SELECT BIN_TO_UUID(id) id,title, year, director, duration, poster, rate FROM movie'

    if (genre) {
      const lowercaseGenre = genre.toLowerCase()
      const [genres] = await connection.query('SELECT id, name FROM genre WHERE LOWER(name) = ?', [lowercaseGenre])

      if (genres.length === 0) return []

      const [{ id }] = genres
      query += ' m join movies_genres mg on m.id = mg.movie_id where mg.genre_id = ?'

      const [movies] = await connection.query(query, [id])
      return movies
    }

    const [movies] = await connection.query(query)

    return movies
  }

  /**
   *  Obtener una película recibiendo su id
  */
  static async getMovieByID ({ id }) {
    const [movies] = await connection.query('SELECT BIN_TO_UUID(id) id,title, year director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?)', [id])
    if (movies.length === 0) return null

    return movies[0]
  }

  /*
  * Crean una película
  */
  static async createNewMovie ({ input }) {
    const { title, year, director, duration, poster, rate } = input.data
    const [uuidResult] = await connection.query('SELECT UUID() uuid')
    const [{ uuid }] = uuidResult
    try {
      await connection.query(
        'INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)', [uuid, title, year, director, duration, poster, rate]
      )
    } catch (error) {
      throw new Error('Error creating movie')
    }

    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id,title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?)',
      [uuid]
    )

    return movies[0]
  }

  static async updatePartialMovie ({ id, input }) {
    const query = 'SELECT BIN_TO_UUID(id) id,title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?)'
    const [movie] = await connection.query(query, [id])
    if (movie.length === 0) return false

    // Aqui una posible forma de generar el query para el update
    // const rows = rowsOriginal.map(({ key, value }) => ` ${key} = ${value}`)
    // const movieToUpdate = { ...movie[0], ...input.data }
    // console.log(rows)

    const entities = Object.keys(input.data).map(key => `${key} = ?`).join(' ,')
    const values = Object.values(input.data)
    values.push(id)
    const queryUpdate = `UPDATE movie SET ${entities} WHERE id = UUID_TO_BIN(?)`

    try {
      await connection.query(queryUpdate, values)
    } catch (error) {
      throw new Error('Error updating movie')
    }

    const [movies] = await connection.query(query, [id])
    return movies[0]
  }

  static async deleteMovie ({ id }) {
    const [movie] = await connection.query('SELECT 1 FROM movie WHERE id = UUID_TO_BIN(?)', [id])
    if (movie.length === 0) return false

    try {
      await connection.query('DELETE FROM movie WHERE id = UUID_TO_BIN(?)', [id])
      return true
    } catch (error) {
      throw new Error('Error deleting movie')
    }
  }
}
