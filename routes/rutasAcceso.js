const express = require('express');
const router = express.Router();
const db = require('../db/config');

// redireccion al login
router.get('/', (req, res) => {
    res.redirect('/login');
});

// mostrar el formulario del login
router.get('/login', (req, res) => {
    res.render('vistaLogin', { error: null });
});

// procesar login
router.post('/login', (req, res) => {
    const { username, contrasena } = req.body;
    const consulta = 'SELECT * FROM usuario WHERE username = ? AND contrasena = ?';

    db.query(consulta, [username, contrasena], (err, resultados) => {
        if (err) {
            console.error('Error al buscar el usuario: ', err);
            return res.render('vistaLogin', { error: 'Error al iniciar sesión. Inténtalo de nuevo.' });
        }

        // credenciales incorrectas
        if (resultados.length === 0) {
            return res.render('vistaLogin', { error: 'Usuario o contraseña son incorrectos.' });
        }

        const usuario = resultados[0];

        // guardar datos básicos en la sesión
        req.session.usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            username: usuario.username
        };

        // al loguearse se va a la lista
        res.redirect('/lista');
    });
});

// formulario para nuevos usuarios
router.get('/registro', (req, res) => {
    res.render('vistaRegistro', { error: null });
});

// registrar nuevos usuarios
router.post('/registro', (req, res) => {
    // OJO: los nombres deben coincidir con los "name" del formulario
    const { nombre, username, contrasena } = req.body;

    // validación básica
    if (!nombre || !username || !contrasena) {
        return res.render('vistaRegistro', { error: 'Todos los campos son obligatorios.' });
    }

    const insertarUsuarios = 'INSERT INTO usuario (nombre, username, contrasena) VALUES (?, ?, ?)';

    db.query(insertarUsuarios, [nombre, username, contrasena], (err) => {
        if (err) {
            console.error('No se pudo registrar el nuevo usuario', err);
            let mensajeError = 'No se pudo registrar el nuevo usuario.';

            if (err.code === 'ER_DUP_ENTRY') {
                mensajeError = 'El usuario ya existe, intenta con otro.';
            }

            return res.render('vistaRegistro', { error: mensajeError });
        }

        // cuando termina de registrar usuario lo mandamos al login
        res.redirect('/login');
    });
});

// cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;
