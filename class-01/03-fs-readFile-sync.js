const fs = require('node:fs');

console.log('Leyendo el primer archivo...');

// const readStream = fs.readFileSync('./archivo.txt', 'utf-8'); // Leyendo un archivo de forma síncrona

// Leyendo un archivo de fomra Asíncrona
fs.readFile('./archivo.txt', 'utf-8', (error, text) => {
  console.log(text);
});

console.log('Hacer cosas mientras se lee el archivo...');

console.log('Leyendo el segundo archivo...');

fs.readFile('./archivo2.txt', 'utf-8', (error, text) => {
  console.log(text);
});

// const secondText = fs.readFileSync('./archivo2.txt', 'utf-8'); // Leyendo un archivo de forma síncrona
