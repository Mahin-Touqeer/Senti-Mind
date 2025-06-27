const { google } = require("googleapis");
const GOOGLE_CLIENT_ID = process.env.O_AUTH_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.O_AUTH_CLIENT_SECRET;
module.exports.oauth2client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "postmessage"
);
