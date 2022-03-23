const moment = require('moment-timezone');
const decoder = require('jwt-decode');
const getTokenFromHeader = require('../Actions/getTokenFromHeader');
// Get events
const getEvents = async (req, res) => {
  //check token require
  const {date} = req.query;
  const accessToken = getTokenFromHeader(req);
  const userData = decoder(accessToken);

  if (!userData)
    return res.status(400).json("AccessToken is require!")

  try {
    return res.status(200).json({time: moment(date).format(), events: [], userData: userData});

  } catch (e) {
    return res.status(404).json(e.toString());
  }
};
// functions get events

exports = module.exports = getEvents;
