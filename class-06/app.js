import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

import { Server } from 'socket.io'
import { createServer } from 'node:http'

dotenv.config()

// Initial server with Express
const PORT = process.env.PORT ?? 3000
const app = express()

// Initial Socket server width socket.io
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {}
})

// Initial Database Connection
const DBCONNECTION = createClient({
  url: 'libsql://welcomed-controller-efrenas.turso.io',
  authToken: process.env.DB_TOKEN
})

await DBCONNECTION.execute(`CREATE TABLE IF NOT EXISTS message (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message TEXT NOT NULL,
  username TEXT
  )`)

io.on('connection', async (socket) => {
  console.log('An user has connected!')

  socket.on('disconnect', () => console.log('An user has disconnected!'))

  socket.on('chat message', async (msg) => {
    let result
    const username = socket.handshake.auth.username ?? 'anonymous'

    try {
      result = await DBCONNECTION.execute({
        sql: 'INSERT INTO message(message, username) VALUES (:msg, :username)',
        args: { msg, username }
      })
    } catch (error) {
      console.log(error)
      return
    }

    io.emit('chat message', msg, result.lastInsertRowid.toString(), username)
  })

  if (!socket.recovered) {
    try {
      const result = await DBCONNECTION.execute({
        sql: 'SELECT id, message, username FROM message WHERE id > ?',
        args: [socket.handshake.auth.serverOffset ?? 0]
      })

      result.rows.forEach(row => {
        socket.emit('chat message', row.message, row.id.toString(), row.username)
      })
    } catch (error) {
      console.log(error)
    }
  }
})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/class-06/client/index.html')
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
