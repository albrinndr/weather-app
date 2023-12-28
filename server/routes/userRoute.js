const express = require('express');
const router = express.Router();

const userController = require('../controller/UserController');

router.post('/signUp', userController.signUp);
router.post('/login', userController.login);
router.post('/addLocation', userController.addLocation);
router.post('/removeLocation', userController.removeLocation);
router.post('/logout', userController.logout);

router.get('/locations', userController.userLocations);

module.exports = router;
