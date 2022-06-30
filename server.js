const express = require("express");
const fs = require("fs");
const app = express();

class Contenedor {
    constructor(fileName){
        this.fileName = fileName;
    }

    async save(object){
      
        try {   
                    let lectura = await fs.promises.readFile(this.fileName, "utf-8")
                    let existents = JSON.parse(lectura)
                    let listObj = [...existents, object]
                    object.id = listObj.length + 1;
                    await fs.promises.writeFile(this.fileName, JSON.stringify(listObj))
                    return console.log(object.id);           
            }
        catch(err){
            console.log("ERROR 2 - CREACION DE FILE");
        }
    }

    async getById(id){

        try {
            let lectura = await fs.promises.readFile(this.fileName, "utf-8")
            let prods = JSON.parse(lectura)
            let prodFind = prods.find(prod => prod.id == id)
            if(prodFind){
                console.log(prodFind)
            }else{console.log(null)}
            }
        catch(err){console.log("ERROR 1 - LECTURA DE FILE");}
    }

    async getRandom(){

        try {
            let lectura = await fs.promises.readFile(this.fileName, "utf-8")
            let prods = JSON.parse(lectura)
            let prodRandom = prods.sort(()=> Math.round(Math.random())-1)
            return prodRandom[1];
            }
        catch(err){console.log("ERROR 1 - LECTURA DE FILE");}
    };

    async getAll(){
        try {
            let lectura = await fs.promises.readFile(this.fileName, "utf-8")
            let prods = await JSON.parse(lectura)
            return prods;
            }
        catch(err){console.log("ERROR 1 - LECTURA DE FILE");}
    };

    async deleteById(id){
        try {
            let lectura = await fs.promises.readFile(this.fileName, "utf-8")
            let prods = JSON.parse(lectura)
            let prodFilterDeleteID = prods.filter(prod => prod.id !== id)
            console.log(prodFilterDeleteID)
            await fs.promises.writeFile(this.fileName, JSON.stringify(prodFilterDeleteID))
            console.log("Guardado ELIMINANDO ID");
            }
            
        catch(err){console.log("ERROR 1 - LECTURA DE FILE");}
    };

    async deleteAll(){
        const prodListVoid = [];
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(prodListVoid))
            console.log("Guardado VACIO");
        }
        catch(err){
            console.log("ERROR 3 - AL VACIAR FILE");
        }
    }
};

const archivo = new Contenedor("producto.txt");
// archivo.save({producto:"Raqueta Nike",precio:30000,imag:"*"})

app.get('/', (req, res) => {
    res.send("Home de app para ver productos y mezclar random. En nube Heroku.")
})

app.get('/productos', async (req, res) => {
    let respuesta = await archivo.getAll()
    res.send(respuesta)
})

app.get('/random', async (req, res) => {
    let respuestaRandom = await archivo.getRandom()
    res.send(respuestaRandom)
})

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando al puerto ${server.address().port}`);
})
server.on('error', error => console.log(`Error en servidor ${error}`));



