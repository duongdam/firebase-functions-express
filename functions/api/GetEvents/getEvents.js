const moment = require('moment-timezone');
const decoder = require('jwt-decode');
const getEventList = require('./getEventCalendar');
const getTokenFromHeader = require('../Actions/getTokenFromHeader');
// Get events
const getEvents = async (req, res) => {
  //check token require
  const {date, timezone} = req.query;
  const accessToken = getTokenFromHeader(req);
  const userData = decoder(accessToken);
  let timeZone;
  const Collection = req.CalEnv === 'stg' ? 'calendar-stg' : 'calendar';
  if (timezone)
    timeZone = timezone;
  else
    timeZone = 'Asia/Tokyo';

  let startTime = date ?
      moment.tz(date, timeZone).startOf('day').utc().format() :
      moment.tz(timeZone).startOf('day').utc().format();
  let endTime = date ?
      moment.tz(date, timeZone).endOf('day').utc().format() :
      moment.tz(timeZone).endOf('day').utc().format();

  try {
    let userId = userData.username;
    const events = await getEventList(userId, startTime, endTime, Collection);

    return res.status(200).
        send({startTime, endTime, events});
  } catch (e) {
    return res.status(404).send('get event error');
  }
};
// functions get events

exports = module.exports = getEvents;
