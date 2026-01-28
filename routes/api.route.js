const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');

router.get('/test', apiController.testMessage);
router.post('/hash', apiController.hashPassword);
router.post('/compare', apiController.comparePassword);

module.exports = router;