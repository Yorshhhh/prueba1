const express = require("express");
const router = express.Router();
const modeloCategoria = require("../models").Categoria;
const modeloCodigoComponente = require("../models").Codigo_Componente;
const modeloComponente = require("../models").Componente;
const modeloComputador = require("../models").Computador;
const modeloRol = require("../models").Rol;
const modeloUsuario = require("../models").Usuario;

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("xe", "jorge", "duoc", {
  host: "127.0.0.1",
  dialect: "oracle", // Elige el dialecto correspondiente a tu base de datos (puede ser 'postgres', 'mysql', 'sqlite', etc.)
});

//CRUD RUTA /TECNICO

//AGREGAR ROLES DE USUARIO
router.post("/add-rol", async (req, res) => {
  modeloRol
    .create(req.body)
    .then((data) => {
      res.json({ datos: data });
    })
    .catch((error) => {
      res.json({ error: error });
    });
});

//AGREGAR CATEGORIA DEL COMPUTADOR
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

//AGREGAR CODIGO DE LOS COMPONENTES
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

router.post("/add-compra-componentes", async (req, res) => {
  try {
    // Inicia una transacción de Sequelize
    const compra = await sequelize.transaction(async (t) => {
      // Buscar el usuario que realizó la compra
      const usuarioExistente = await modeloUsuario.findByPk(req.body.rut, {
        transaction: t,
      });

      if (!usuarioExistente) {
        console.error(`Usuario con rut: ${req.body.rut} no encontrado`);
        throw new Error(`Usuario con rut: ${req.body.rut} no encontrado`);
      }

      // Paso 1: Recorrer los componentes enviados en la petición y asociarlos a la compra
      const nuevosComponentes = [];

      for (const componenteData of req.body.num_componente) {
        const nuevoComponente = await modeloComponente.create(
          {
            num_componente: componenteData.num_componente,
            cod_componente: componenteData.cod_componente,
            num_compra: componenteData.num_compra,
            descripcion: componenteData.descripcion,
            marca: componenteData.marca,
            cantidad: componenteData.cantidad,
          },
          {
            transaction: t,
          }
        );
        // Asociar el usuario a cada componente creado
        await nuevoComponente.addUsuario(usuarioExistente, {
          transaction: t,
        });
        // Almacenar cada nuevo componente creado
        nuevosComponentes.push(nuevoComponente);
      }

      // Paso 2: Devolver los componentes creados
      return nuevosComponentes;
    });

    // Paso 3: Enviar una respuesta al cliente
    return res.status(201).json({
      status: "success",
      message: "Compra realizada con éxito",
      compra,
    });
  } catch (error) {
    // Paso 4: Manejar errores y enviar una respuesta de error al cliente
    console.error(error);

    // Verificar el tipo de error para proporcionar una respuesta adecuada
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ error: "Datos de entrada no válidos" });
    }

    return res.status(500).json({ error: "Error en el servidor" });
  }
});

//AGREGAR COMPONENTE
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

//OBTENER LISTA DE TODOS LOS COMPONENTES
router.get("/get-componentes", async (req, res) => {
  try {
    const listaComponentes = await modeloComponente.findAll();
    return res.status(200).json({ success: true, data: listaComponentes });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Error al obtener componentes" });
  }
});

//AGREGAR COMPUTADORES
router.post("/add-computador", async (req, res) => {
  try {
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
        //que pasa aqii
        await nuevoComputador.addComponente(componenteExistente, {
          transaction: t,
        });
      }

      return nuevoComputador;
    });

    // Envía una respuesta al cliente
    return res.status(201).json({
      status: "success",
      message: "Computador creado con éxito",
      computador,
    });
  } catch (error) {
    console.error(error);
    // Envía una respuesta de error al cliente
    return res.status(500).json({ error: "Error en el servidor" });
  }
});

//OBTENER LISTA DE TODOS LOS COMPUTADORES
router.get("/get-computadores", async (req, res) => {
  try {
    const listaComputadores = await modeloComputador.findAll();
    return res.status(200).json({ success: true, data: listaComputadores });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Error al obtener los computadores" });
  }
});

module.exports = router;
