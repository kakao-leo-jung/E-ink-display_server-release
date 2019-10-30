var admin = require("firebase-admin");
var serviceAccount = require("/root/fcm_config/magic_config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;