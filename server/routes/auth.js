const express = require('express')
const router = express.Router(),
{ _create,_findByUserRut } = require('../controllers/users')

router.post("/register", async (req,res) => {
    try{
        const foundUser = await _findByUserRut(req.body.rut)

        if(foundUser){
            return res.status(400).json(`El usuario con rut ${foundUser.rut} ya existe`)
        }
        
        const user = await _create(req.body)
        return res.status(201).json({
            status: 'success',
            message: `El usuario ${user.nombre_completo} fue creado con éxito`
        })
    }catch(e){
        return res.status(500).json(e.message)
    }
})
module.exports = router