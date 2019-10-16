// importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');

require('dotenv').config({path: 'variables.env'});


/* db.authenticate()
    .then(() => console.log('DB Conn'))
    .catch(error => console.log(error)) */



// config express
const app = express();

// Habilitar pug
app.set('view engine', 'pug');

// Add views
app.set('views', path.join(__dirname, './views'));

//Load static folder called Public
app.use(express.static('public'));

// Validar Dev or Prod
const config = configs[app.get('env')];

app.locals.titulo = config.nombresitio;

//Muestra el año actual
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    
    return next();
})

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());

/* Puerto y Host para la app */

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('Server working');
});



