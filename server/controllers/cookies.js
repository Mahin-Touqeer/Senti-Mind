const AUTH_TOKEN = process.env.AUTH_TOKEN;
const CT0 = process.env.CT0;
const PERSONALIZATION_ID = process.env.PERSONALIZATION_ID;
const KDT = process.env.KDT;
const TWID = process.env.AUTH_TOKEN;

module.exports = cookies = [
  {
    name: "auth_token",
    value: AUTH_TOKEN,
    domain: ".x.com",
    path: "/",
    httpOnly: true,
    secure: true,
  },
  {
    name: "ct0",
    value: CT0,
    domain: ".x.com",
    path: "/",
    httpOnly: true,
    secure: true,
  },
  {
    name: "personalization_id",
    value: PERSONALIZATION_ID,
    domain: ".x.com",
    path: "/",
    httpOnly: true,
    secure: true,
  },
  {
    name: "kdt",
    value: KDT,
    domain: ".x.com",
    path: "/",
    httpOnly: true,
    secure: true,
  },
  {
    name: "twid",
    value: TWID,
    domain: ".x.com",
    path: "/",
    httpOnly: true,
    secure: true,
  },
];
