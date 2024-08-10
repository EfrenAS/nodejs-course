import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:1234',
  'http://localhost:5500',
  'http://localhost:8080',
  'http://127.0.0.1:5500',
  'https://movies.com',
  'https://midu.dev'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin) || !origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})

/**
 *  CORS PRE-Flight, cuando se hace una petición PUT, PAT o DELETE se requiere una petición especial llamada OPTIONS
*/
