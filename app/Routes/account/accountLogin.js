const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


router.get('/account_test', async (req, res) => {
	// req.session.user = null;
	res.status(200).send('I have hit the route');
});



module.exports = router;