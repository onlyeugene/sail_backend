const express = require('express');
const { signUp, signIn, getMatches } = require('../controllers/user-controller'); // Ensure correct import
const authMiddleWare = require('../middlewares/authorization');

const router = express.Router();

// Define the signup route
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/matches', authMiddleWare, getMatches);

module.exports = router;
