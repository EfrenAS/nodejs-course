import { Router } from 'express'

//  Controllers
import { MovieController } from '../controllers/movies.js'

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router()
  const movieController = new MovieController({ movieModel })

  moviesRouter.get('/', movieController.getAll)
  moviesRouter.get('/:id', movieController.getMovieByID)
  moviesRouter.post('/', movieController.createNewMovie)
  moviesRouter.patch('/:id', movieController.updatePartialMovie)
  moviesRouter.delete('/:id', movieController.deleteMovie)

  return moviesRouter
}
