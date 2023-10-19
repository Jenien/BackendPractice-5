const express = require('express');
const router = express.Router();
const nasabahControllers = require('../controllers/nasabah.controllers');

router.post('/', nasabahControllers.createNasabah); 
router.get('/', nasabahControllers.getNasabahList); 
router.get('/:id', nasabahControllers.getNasabah); 
router.put('/:id', nasabahControllers.updateNasabah); 
router.delete('/:id', nasabahControllers.deleteNasabah);

module.exports = router;
