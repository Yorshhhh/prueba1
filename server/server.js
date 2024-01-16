require("dotenv").config();
const express = require("express");
cookieParser = require("cookie-parser");
app = express();
db = require("./models");
cors = require("cors");
morgan = require("morgan");
bodyParser = require("body-parser");
passport = require("passport");
LocalStrategy = require("./passport/local");
JWTStrategy = require("./passport/jwt");

app.use(
  cors({
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
passport.use("local", LocalStrategy);
passport.use("jwt", JWTStrategy);
app.use(passport.initialize());

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

const computadores = [];

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

app.post("/computadores", (req, res) => {
  try {
    const newComputador = {
      id: computadores.length + 1,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      stock: req.body.stock,
      precio: req.body.precio,
    };
    computadores.push(newComputador);
    res.send("Computador agregado con éxito");
  } catch (e) {
    return res.status(500).json({ error: "Error del servidor" });
  }
});

app.get("/computadores", (req, res) => {
  res.json(computadores);
});

app.listen(5001, () => {
  console.log("Server Running on Port 5001");
});

db.sequelize
  .sync()
  .then(() => console.log("Conectado a la Base de Datos finalmente jorge"))
  .catch((e) => console.log(`Error => ${e}`));
