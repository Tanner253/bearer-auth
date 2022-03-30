"use strict";

const base64 = require("base-64");
const { users } = require("../models/index.js");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }
  try {
    let basic = req.headers.authorization;
    let encodedString = basic.split(" ")[1];
    let [username, pass] = base64.decode(encodedString).split(":");
    req.user = await users.authenticateBasic(username, pass);
    console.log("barer call to basic");
    if (req.user) {
      next();
    }else{
      throw new Error("Invalid mate");
    }
    console.log("logging");
    // res.status(403).send("Invalid");
  } catch (e) {
    res.status(403).send("Invalid Login");
  }
};
