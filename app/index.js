require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3004;


// add sequelize to this backend


// Middleware
app.use(cookieParser());
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: true,
		store: store,
		cookie: {
			secure: false,
			maxAge: 2592000000,
		},
	})
);
store.sync();










app.listen(PORT, console.log(`Listening on port ${PORT}`));