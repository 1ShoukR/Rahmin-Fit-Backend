require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');