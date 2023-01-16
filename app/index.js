require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const models = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({
	db: models.sequelize,
});
const PORT = process.env.PORT || 3004;
const testRoute = require("./Routes/testRoute/testRoute")
const accountRoute = require("./Routes/account/accountLogin")

// add sequelize to this backend


// Middleware
app.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE' }));
app.use(express.json());
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




// links for the webpages
app.use('/api/account', accountRoute)






app.listen(PORT, console.log(`Listening on port ${PORT}`));