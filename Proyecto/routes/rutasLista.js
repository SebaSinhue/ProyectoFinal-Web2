
const express = require('express');
const router = express.Router();
const db = require('../db/config');


// protegemos las rutas para que solo puedan verlas los usuarios logueados
function protegerRutas(req, res, next) {
    if(!req.session.usuario) {
        return res.redirect('/login');
    }
    next();
}

// mostramos la lista de registros
router.get('/', protegerRutas, (req, res) => {
    const consulta = 'SELECT * FROM lista ORDER BY id DESC';

    db.query(consulta, (err, resultado) => {
        if (err) {
            console.error('No se pudo obtener la lista', err);
            return res.send('Ocurrio un error al obtener la lista ):');
        }

        res.render('vistaLista', {registros: resultado});
    });
});

// agregar un nuevo registro
router.post('/agregar', protegerRutas, (req, res) => {
    const { titulo, correo } = req.body;

    const insertarRegistro = 'INSERT INTO lista (titulo, descripcion) VALUES (?, ?)';

    db.query(insertarRegistro, [titulo, correo], (err) => {
        if (err) {
            console.error('No se pudo agregar el registro', err);
            return res.send('Ocurrio un error al agregar el registro');
        }

        res.redirect('/lista');
    });
});

// editar los registros
router.post('/editar/:id', protegerRutas, (req, res) => {
    const { id } = req.params;
    const { titulo, correo } = req.body;

    const actualizarRegistro = 'UPDATE lista SET titulo = ?, descripcion = ? WHERE id = ?';

    db.query(actualizarRegistro, [titulo, correo, id], (err) => {
        if (err) {
            console.error('No se pudo actualizar el registro', err);
            return res.send('Ocurrio un error al actualizar el registro');
        }

        res.redirect('/lista');
    });
});

// eliminar los registros
router.post('/eliminar/:id', protegerRutas, (req, res) => {
    const {id} = req.params;
    const eliminarRegistro = 'DELETE FROM lista WHERE id = ?';

    db.query(eliminarRegistro, [id], (err) => {
        if(err) {
            console.error("No se pudo eliminar el registro", err);
            return res.send('Ocurrio un error al eliminar el registro');
        }

        res.redirect('/lista');
    });
});

module.exports = router;