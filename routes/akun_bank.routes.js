const express = require('express');
const router = express.Router();
const akunBankControllers = require('../controllers/akun_bank.controllers');

router.post('/', akunBankControllers.createAkunBank);
router.get('/', akunBankControllers.getAkunBankList); 
router.get('/:id', akunBankControllers.getAkunBankDetail); 
router.put('/:id', akunBankControllers.updateAkunBank); 
router.delete('/:id', akunBankControllers.deleteAkunBank);

module.exports = router;
