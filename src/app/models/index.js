const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.plants = require("./plants.model.js")(mongoose);
db.clients = require("./clients.model.js")(mongoose);

module.exports = db;