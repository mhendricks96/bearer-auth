'use strict';

const base64 = require('base-64');
const { user } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization){ 
    res.status(403).send('Invalid Login');
  }

  let basic = req.headers.authorization.split(' ');
  basic = base64.decode(basic)[1];
  let [username, pass] = basic.split(':');

  try {
    req.user = await user.authenticateBasic(username, pass);
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

};