const express = require("express");
const router = express.Router();
const modeloCategoria = require("../models").Categoria;
const modeloCodigoComponente = require("../models").Codigo_Componente;
const modeloComponente = require("../models").Componente;
const modeloComputador = require("../models").Computador;

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

router.post("/add-computador", async (req,res) => {
  modeloComputador.create(req.body)
  .then((data) => {
    res.json({datos: data})
  })
  .catch((error) => {
    res.json({error: error})
  })
})

module.exports = router;
