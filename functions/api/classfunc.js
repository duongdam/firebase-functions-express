const express = require('express');
const momentTz = require('moment-timezone');
const cors = require('cors');
const functions = require('firebase-functions');
const app = express();
const myMiddleware = require('./Actions/myMiddleware');
// const createEvent = require('./CreateEvent/createEvent');
const getEvents = require('./GetEvents/getEvents');
// const updateEvent = require('./UpdateEvent/updateEvent');
// const moveEvent = require('./MoveEvent/moveEvent');
// const deleteEvent = require('./DeleteEvent/deleteEvent');

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

const API_PREFIX = 'apiCalendar';

// // Add middleware to authenticate requests
app.use(myMiddleware);

app.use((req, res, next) => {
  console.log('new Date', new Date());
  console.log('moment tz Tokyo',
      momentTz.tz('Asia/Tokyo').startOf('day').utc().format());
  console.log('moment tz Saigon',
      momentTz.tz('Asia/Saigon').startOf('day').utc().format());
  if (req.hostname.includes('localhost') ||
      req.hostname.includes('calendar-stg.geniam.com') ||
      req.rawHeaders.includes('calendar-stg.geniam.com')) {
    //stg
    req.CalEnv = 'stg';
  }

  if (req.url.indexOf(`/${API_PREFIX}/`) === 0) {
    req.url = req.url.substring(API_PREFIX.length + 1);
  }
  next();
});

// build multiple CRUD interfaces:
app.get('/', (req, res) => getEvents(req, res));
// app.post('/create', (req, res) => createEvent(req, res));
// app.post('/update', (req, res) => updateEvent(req, res));
// app.post('/move', (req, res) => moveEvent(req, res));
// app.delete('/', (req, res) => deleteEvent(req, res));

// Expose Express API as a single Cloud Function:
exports = module.exports = functions.https.onRequest(app);
