const path = require('node:path')

// Barra separadora según de directorios segun el SO
console.log(path.sep)

// Unión de rutas
const filepath = path.join('content', 'subfolder', 'test.txt')
console.log(filepath)

const basePath = path.basename('/temp/secret-files/password.txt')
console.log(basePath)

const filename = path.basename('/temp/secret-files/password.txt', '.txt')
console.log(filename)

const extesion = path.extname('image.png')
console.log(extesion)
