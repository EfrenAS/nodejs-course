// const fs = require('node:fs/promises'); // Definimos que utilizaremos las promesas que ya estan activas en el modulo de File System

// NOTA: Esto SÓLO utilizarlo en los módulos nativos de Node que
//  no tienen promesas nativas

// const { promisify } = require('node:util');
// const readFilePrommise = promisify(fs.readFile);

// console.log('Leyendo el primer archivo...');

// fs.readFile('./archivo.txt', 'utf-8')
//   .then((text) => console.log(text))
//   .catch((error) => console.log(error));

// console.log('Hacer cosas mientras se lee el archivo...');

// console.log('Leyendo el segundo archivo...');

// fs.readFile('./archivo2.txt', 'utf-8')
//   .then((text) => console.log(text))
//   .catch((error) => console.log(error));

import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
])
  .then(([firstText, secondText]) => {
    console.log(firstText)
    console.log(secondText)
  })
  .catch((err) => {
    console.log(err)
  })

// Continue en 1:11:15 Nodejs Course by Midudev on Youtube
