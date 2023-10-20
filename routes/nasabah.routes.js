const express = require('express');
const router = express.Router();
const nasabahControllers = require('../controllers/nasabah.controllers.js');

router.post('/register', nasabahControllers.createNasabah); 
router.post('/login', nasabahControllers.loginNasabah);
router.get('/', nasabahControllers.getNasabahList); 
router.get('/:id', nasabahControllers.getNasabah); 
router.put('/:id', nasabahControllers.updateNasabah); 
router.delete('/:id', nasabahControllers.deleteNasabah);

module.exports = router;
