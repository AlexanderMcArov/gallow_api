const express = require('express');
const { accesLog } = require('./colors')

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.get('/', function (req, res) {
    res.send('About birds');
});

accesLog('API', 'Роут запущен.')
module.exports = router;