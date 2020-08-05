const decoder = require('jwt-decode');
const moment = require('moment');
const getTokenFromHeader = require('../Actions/getTokenFromHeader');

const myMiddleware = (req, res, next) => {
  try {
    const accessToken = getTokenFromHeader(req);
    if (!accessToken)
      return res.status(400).send('AccessToken is missing');

    const userData = decoder(accessToken);
    if (moment(userData.exp * 1000).isBefore(moment().format()))
      return res.status(400).send('AccessToken is expired');

    return next();
  } catch (e) {
    console.log(e);
    return res.status(401).send('Login require!');
  }
};

exports = module.exports = myMiddleware;
