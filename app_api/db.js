const mongoose = require("mongoose");

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
} = process.env;

const opts = {
  keepAlive: 1,
  user: MONGO_USER,
  pass: MONGO_PASS,
  dbName: MONGO_DB,
  useNewUrlParser: true,
};

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}`, opts);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("db connected");
});
