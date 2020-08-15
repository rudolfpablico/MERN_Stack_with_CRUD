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

// //Uncomment to deploy on heroku
// const path = require("path");

// //Serve static folder if production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

//Setup Port
const port = process.env.PORT || 5000;

//Listen to port
app.listen(port, () => console.log(`Server connected on port ${port}`));
