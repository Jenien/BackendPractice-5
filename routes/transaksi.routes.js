const express = require('express');
const router = express.Router();
const transaksiControllers = require('../controllers/transaksi.controllers');

router.post('/', transaksiControllers.createTransaksi); 
router.get('/', transaksiControllers.getTransaksiList); 
router.get('/:id', transaksiControllers.getTransaksiDetail); 
router.put('/:id', transaksiControllers.updateTransaksi); 
router.delete('/:id', transaksiControllers.deleteTransaksi);

module.exports = router;
