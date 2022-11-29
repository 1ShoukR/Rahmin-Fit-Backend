require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3004;


// add sequelize to this backend


// Middleware











app.listen(PORT, console.log(`Listening on port ${PORT}`));