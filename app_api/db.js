const mongoose = require("mongoose");

const opts = {
  keepAlive: 1,
  dbName: "blogger",
  useNewUrlParser: true,
};

mongoose.connect(`mongodb://mongo`, opts);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("db connected");
});
