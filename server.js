const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 8081

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando al puerto ${server.address().port}`);
})
server.on('error', error => console.log(`Error en servidor ${error}`));

app.get('/', (req, res) => {
    res.send('Hola Brrrr')
})

app.get('/uno', (req, res) => {
    res.send('Hola Br 1')
})

app.get('/dos', (req, res) => {
    res.send('Hola Br 2')
})


// process.env.PORT ||