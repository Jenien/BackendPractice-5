const express = require('express');
const router = express.Router();
const nasabahControllers = require('../controllers/nasabah.controllers');

router.post('/register', nasabahControllers.createNasabah); 
router.get('/', nasabahControllers.getNasabahList); 
router.get('/:id', nasabahControllers.getNasabah); 
router.put('/:id', nasabahControllers.updateNasabah); 
router.delete('/:id', nasabahControllers.deleteNasabah);
router.post('/login', nasabahControllers.loginNasabah);

module.exports = router;
