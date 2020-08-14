const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const items = require("./routes/api/items");

const app = express();

//BodyParser Middleware
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected."))
  .catch((err) => console.log(err));

//Use Routes
app.use("/api/items", items);

//Setup Port
const port = process.env.PORT || 5000;

//Listen to port
app.listen(port, () => console.log(`Server connected on port ${port}`));
