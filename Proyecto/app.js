const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const db = require('./db/config');
const app = express();
const port = process.env.PORT || 2112;

// view
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(session({
    secret: 'secreto_sesion_sebas_2410',
    resave: false,
    saveUninitialized: false
}));

// sesion (quien se esta logeando)
app.use((req, res, next) => {
    res.locals.usuario = req.session && req.session.usuario
    ? req.session.usuario
    : null ;
    next();
});

// rutas
const rutasAcceso = require('./routes/rutasAcceso');
const rutasLista = require('./routes/rutasLista');

app.use('/', rutasAcceso);
app.use('/lista', rutasLista);


app.listen(port, () => {
    console.log(`El servidor esta funcionando en http://localhost:${port}`);
});

