const express = require('express');
const router = express.Router();
const db = require('../db');

// Insertar datos (POST /guardar)
router.post('/guardar', (req, res) => {
  const {
    nombre, apellido_paterno, apellido_materno,
    curp, clave_elector, direccion,
    municipio, estado, codigo_postal,
    anio_registro, vigencia
  } = req.body;

  const sql = `
    INSERT INTO personas (
      nombre,
      apellido_paterno,
      apellido_materno,
      curp,
      clave_elector,
      direccion,
      municipio,
      estado,
      codigo_postal,
      anio_registro,
      vigencia
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    nombre,
    apellido_paterno,
    apellido_materno,
    curp,
    clave_elector,
    direccion,
    municipio,
    estado,
    codigo_postal,
    anio_registro,
    vigencia
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

module.exports = router;
