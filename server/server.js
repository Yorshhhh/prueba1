const express = require("express");
const bcrypt = require("bcrypt")
var cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

async function generarHash(password){
  const hash = await bcrypt.hash(password,10)
  return hash
}

const users = []

app.get("/home", (req, res) => {
  let nextId = 1;
  const usuarios = [
    {
      id: nextId++,
      rut: 1111111111,
      password: "usuario 1",
    },
    {
      id: nextId++,
      rut: 222222222,
      password: "usuario 2",
    },
  ];
  res.json({ usuarios: usuarios });
});

app.post("/register", async (req,res) => {
  try{
    const passwordCifrada = await generarHash(req.body.password)

    const newUser = {
      id: users.length + 1,
      rut: req.body.rut,
      password: passwordCifrada
    }
    users.push(newUser)
    res.send("Usuario creado con éxito")
  }catch(e){
    return res.status(500).json({ error: "Error del servidor"})
  }
})

app.get("/register", (req, res) => {
  res.json(users);
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
