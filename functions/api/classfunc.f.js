const express = require('express');
const momentTz = require('moment-timezone');
const cors = require('cors');
const functions = require('firebase-functions');
const app = express();
const myMiddleware = require('./Actions/myMiddleware');

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

const API_PREFIX = 'apiCalendar';

// // Add middleware to authenticate requests
app.use(myMiddleware);

app.use((req, res, next) => {
  console.log('new Date', new Date());
  if (req.hostname.includes('localhost')) {
    //stg
    req.CalEnv = 'stg';
  }

  if (req.url.indexOf(`/${API_PREFIX}/`) === 0) {
    req.url = req.url.substring(API_PREFIX.length + 1);
  }
  next();
});

// build multiple CRUD interfaces:
app.use("/write", require("./routes/writeData"))
// app.post('/update', (req, res) => updateEvent(req, res));
// app.post('/move', (req, res) => moveEvent(req, res));
// app.delete('/', (req, res) => deleteEvent(req, res));

// Expose Express API as a single Cloud Function:
exports = module.exports = functions.region("us-central1").https.onRequest(app);
