const express = require('express'),
router = express.Router(),
{ _findAll } = require('../controllers/users')

router.get("/", async (req,res) =>{
    try{
        const users = await _findAll()
        return res.status(200).json(users)
    }catch(e){
        return res.status(500).json(e.message)
    }
})
module.exports = router