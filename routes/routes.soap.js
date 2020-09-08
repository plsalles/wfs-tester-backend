const { Router } = require('express');
const EWSController = require('../controllers/ews/ews.controller');

const router = Router();

router.post('/findItem', EWSController.findItem);


module.exports = router;