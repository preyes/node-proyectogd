const express = require('express');
const routes = require('./routes/routes');//requiere todas las rutas de la carpeta routes // se crea un objeto app para usar los metodos de express
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-Parser'); //importar body-Parser para leer datos de formularios



//const controladores = require('/controllers/controladores');

//const json_autos = fs.readFileSync('src/autos.json', 'utf-8');

//const autos = JSON.parse(json_autos);
//const c = 1;

// settings
app.set('port', process.env.PORT || 4000);
//app.set('port',4000);

//donde cargar los archivos estaticos
app.use(express.static('public'));

//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//app.set('view engine', 'ejs'); // setea "ejs" para usarse en las plantillas
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'pug');

// middlewares
app.use(morgan('dev'));

//Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes()); //usa la funcion routes(); para asignar las rutas

// listening the Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});