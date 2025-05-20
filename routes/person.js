const express = require('express');
const router = express.Router();
const db = require('../db');





// Insertar datos (POST /guardar)
router.post('/guardar', (req, res) => {
  const {
clave_lector, curp, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, genero
  } = req.body;

  const sql = `
INSERT INTO personas (
  clave_lector, curp, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, genero
) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    clave_lector, curp, nombres, apellido_paterno, apellido_materno, fecha_nacimiento, genero
  ], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: 'Datos guardados correctamente' });
  });
});







// Consultar todos los registros (GET /personas)
router.get('/personas', (req, res) => {
  const sql = `SELECT * FROM personas`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});



// Consultar todos los registros by id (GET /personas)
router.get('/personasbyID/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM personas where id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'Not found'})
    res.status(200).json(results);
  });
});





// Consultar todos los registros by id (GET /personas)
router.get('/personasbyCurp/:curp', (req, res) => {
  const curp = req.params.curp;
  const sql = `SELECT * FROM personas where curp = ?`;

  db.query(sql, [curp], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'Not found'})
    res.status(200).json(results);
  });
});






router.delete('/eliminarPersona/:id', (res, req) => {
  const id = req.params.id;
  const sql = `DELETE FROM personas where id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Persona no encontrada' });
    res.status(200).json({ message: 'Delete confirmated'});
  })
})

module.exports = router;
