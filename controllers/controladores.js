const fs = require('fs');
const json_autos = fs.readFileSync('src/autos.json', 'utf-8');
let autos = JSON.parse(json_autos);
const c = 1;
const { v4: uuidv4 } = require('uuid');

exports.inicio = (req, res) => {
    // console.log(req.body);
    res.render('index', { autos, c });
    //res.send('Index'); el servidor envia una respuesta con send
}

exports.formAutoGet = (req, res) => {
    res.render('nuevoauto', {                  //nuevoauto nombre de la vista
        nombrePagina: 'Alta Auto',
        autos
    });
}

exports.nuevoAuto = (req, res) => {
    console.log(req.body);

    //Validar que vienen datos en el input

    const { marca, modelo, año } = req.body;
    let errores = []; //arreglo errores vacio

    if (!marca) { //si no hay nada en el input de nombreTarea
        console.log('entro al if');
        errores.push({ 'texto': 'Ingrese datos' });

    }
    //si hay errores
    if (errores.length > 0) {

        res.render('nuevoauto', {    //pasa los errores a la vista nuevoauto.pug
            nombrePagina: 'Nuevo auto',
            e: 'Ingrese datos',
            errores
        });
        console.log(errores);
    } else {

        //Agregar datos a DB 

        var newAuto = {
            id: uuidv4(),
            marca,
            modelo,
            año
        };

        autos.push(newAuto);
        const json_autos = JSON.stringify(autos); // convierte en string lo que tiene el array pilot
        fs.writeFileSync('src/autos.json', json_autos, 'utf-8');      // guarda en el archivo pilots.json lo que viene de json_pilots
        //res.log(pilots);
        res.redirect('/nuevo-auto');


    }


}

exports.borrarAuto = (req, res) => {

    console.log(req.params); //req.params trae el id del objeto

    autos = autos.filter(auto => auto.id != req.params.id);

    // saving data
    const json_autos = JSON.stringify(autos);
    fs.writeFileSync('src/autos.json', json_autos, 'utf-8');

    res.redirect('/nuevo-auto');

}