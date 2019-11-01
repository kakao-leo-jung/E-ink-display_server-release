var express = require('express');
var router = express.Router();

/* /debug/webJwt */
router.get('/', (req, res) => {

    res.render('debug/webjwt.html');

});

module.exports = router;