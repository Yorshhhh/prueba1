const express = require("express");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/home", (req, res) => {
    let nextId = 1
    const usuarios = [
        {
            id: nextId++,
            rut: 1111111111,
            password: "usuario 1"
        },{
            id: nextId++,
            rut: 222222222,
            password: "usuario 2"
        }
    ]
  res.json({ usuarios: usuarios});
});

app.get("/register", (req, res) => {
    let nextId = 1
    const usuarios = [
        {
            id: nextId++,
            rut: 1111111111,
            password: "usuario 1"
        },{
            id: nextId++,
            rut: 222222222,
            password: "usuario 2"
        },
        {
            id: nextId++,
            rut: 18888764,
            password: "yorsh"
        }
    ]
  res.json({ usuarios: usuarios});
});

app.get("/about", (req, res) => {
  let nextId = 1;
  const departamentos = [
    {
      id: nextId++,
      nombre: "departamento normal",
      capacidad_depto: 5,
      descripcion: "Lindo departamento en coronel",
      precio: 299999,
    },
    {
      id: nextId++,
      nombre: "departamento medio",
      capacidad_depto: 6,
      descripcion: "Lindo departamento en san pedro",
      precio: 399999,
    },
  ];
  res.json({ departamentos: departamentos });
});


app.listen(5001, () => {
  console.log("Server Running on Port 5001");
});
