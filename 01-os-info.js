//  Apartir de la versión 16 de Nodejs se recomienda utilizar el prefijo
//  node seguido de dos puntos y em modulo que se requiere utilizar

const os = require('node:os')

console.log('Información del sistema operativo')
console.log('-----------------------------')
console.log('Nombre del Sistema Operativo', os.platform())
console.log('Versión del Sistema Operativo', os.release())
console.log('Arquitectura', os.arch())
console.log('CPUs', os.cpus())
console.log('Memoria RAM libre', os.freemem() / 1024 / 1024)
console.log('Memoria RAM ocupada', os.totalmem() / 1024 / 1024)
