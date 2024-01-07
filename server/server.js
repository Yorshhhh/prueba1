require('dotenv').config()
const express = require("express");
cookieParser = require('cookie-parser')
app = express()
db = require('./models')
cors = require("cors");
morgan = require("morgan")
bodyParser = require('body-parser')
passport = require('passport')
LocalStrategy = require('./passport/local')
JWTStrategy = require("./passport/jwt")


app.use(cors({
  credentials: true
}));
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.json());
app.use(cookieParser())
passport.use('local', LocalStrategy)
passport.use('jwt', JWTStrategy)
app.use(passport.initialize())

app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))

const deptos = []

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

app.post("/departamentos", (req,res) => {
  try{
    const newDepto = {
      id: deptos.length + 1,
      capacidad: req.body.capacidad,
      disponibilidad: req.body.disponibilidad,
      direccion: req.body.direccion,
      habitaciones: req.body.habitaciones,
      precio: req.body.precio,
      descripcion: req.body.descripcion
    }
    deptos.push(newDepto)
    res.send("Departamento agregado con éxito")

  }catch(e){
    return res.status(500).json({error: "Error del servidor"})
  }
})

app.get("/departamentos", (req,res) =>{
  res.json(deptos)
})

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

db.sequelize.sync()
.then( () => console.log('Conectado a la Base de Datos finalmente jorge'))
.catch((e) => console.log(`Error => ${e}`))