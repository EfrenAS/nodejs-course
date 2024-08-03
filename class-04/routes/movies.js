import { Router } from 'express'

//  Controllers
import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.get('/:id', MovieController.getMovieByID)
moviesRouter.post('/', MovieController.createNewMovie)
moviesRouter.patch('/:id', MovieController.updatePartialMovie)
moviesRouter.delete('/:id', MovieController.deleteMovie)
