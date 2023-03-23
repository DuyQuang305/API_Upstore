
const express = require('express');

const router = express.Router();

const customerController = require('../Controllers/CustomerController');

router.get('/', customerController.show);

router.post('/store', customerController.create);

router.delete('/:id', customerController.delete);

router.put('/:id', customerController.update);


module.exports = router;