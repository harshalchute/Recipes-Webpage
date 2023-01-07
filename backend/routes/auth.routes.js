const express = require("express");
const UserController = require('../controllers/auth.controller');
const router = express.Router()

router.get('/test-connection', (req, res) => {
    res.status(200).json({ success: true, message: 'Backend Successfully Worked!!!' })
})

router.post('/register', UserController.createAccount)
router.post('/login', UserController.login)

module.exports = router;