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
const testRoute = require("./Routes/testRoute")

// add sequelize to this backend


// Middleware
app.use(cors());
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





app.use('/test_route', testRoute);






app.listen(PORT, console.log(`Listening on port ${PORT}`));