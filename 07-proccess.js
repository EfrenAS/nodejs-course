const process = require('node:process')

//  Argumentos de entrada
console.log(process.argv)

// Controlar el proceso y su salida 0 el proceos terminará correctamente, 1 debe de terminar el proceso pues ocurrió un error
process.exit(0)

//  Podemos controlar eventos del proceso
process.on('exit', (code) => {
  console.log(`El proceso terminó con el código ${code}`)
})

// Current working directory
console.log(process.cwd())
