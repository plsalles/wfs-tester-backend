const { Router } = require('express');
const restRoutes = require('./routes.rest');
const soapRoutes = require('./routes.soap');

const router = Router();

router.use('/rest', restRoutes);
router.use('/soap', soapRoutes);

module.exports = router;