const express = require("express");
const router = express.Router();
const modeloCategoria = require("../models").Categoria;
const modeloCodigoComponente = require("../models").Codigo_Componente;
const modeloComponente = require("../models").Componente;
const modeloComputador = require("../models").Computador;

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("xe", "jorge", "duoc", {
  host: "127.0.0.1",
  dialect: "oracle", // Elige el dialecto correspondiente a tu base de datos (puede ser 'postgres', 'mysql', 'sqlite', etc.)
});

router.post("/add-categoria-computador", async (req, res) => {
  modeloCategoria
    .create(req.body)
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
});

router.post("/add-codigo-componente", async (req, res) => {
  modeloCodigoComponente
    .create(req.body)
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
});

router.post("/add-componente", async (req, res) => {
  modeloComponente
    .create(req.body)
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
});

router.post("/add-computador", async (req, res) => {
  const computador = await sequelize.transaction(async (t) => {
    const nuevoComputador = await modeloComputador.create(
      {
        cod_pc: req.body.cod_pc,
        cod_categoria: req.body.cod_categoria,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
      },
      { transaction: t }
    );

    // Asocia los componentes al computador
    for (const componenteId of req.body.num_componente) {
      const componenteExistente = await modeloComponente.findByPk(
        componenteId,
        { transaction: t }
      );

      if (!componenteExistente) {
        console.error(`Componente con ID ${componenteId} no encontrado`);
        throw new Error(`Componente con ID ${componenteId} no encontrado`);
      }

      await nuevoComputador.addComponente(componenteExistente, {
        transaction: t,
      });
    }

    return nuevoComputador;
  });
});
module.exports = router;
