const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
var indexRouter = require("./src/routes");
const app = express();
// const https = require("https"),
(fs = require("fs")), (helmet = require("helmet"));
const stripeController = require("./src/controllers/stripe.controller");


app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.post(
  "/api/v1/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeController.webhook
);


app.use(helmet()); // Add Helmet as a middleware

app.use(morgan("tiny"));

app.use(bodyParser.urlencoded({ extended: true, limit: "2048mb" }));
app.use(
  bodyParser.json({
    limit: "2048mb",
  })
);

app.use(cookieParser());


app.use("/uploads", express.static(__dirname + "/uploads"));

app.get("/", (req, res) => {
  res.writeHead(200);
  res.send("HT API Server");
});

try {
  // Initiate the API //
  app.use("/api/v1/", indexRouter);
} catch (e) {
  console.log(e);
}

const port = process.env.PORT || 8080;

// app.listen(port, "127.0.0.1", function () {
//   console.log(`Server listening on port ${port}`);
// });

// const sport = process.env.PORT || 5050;

// http.createServer(app).listen(sport, function () {
//   console.log(`Https Server listening on port ${sport}`);
//   socket.config(app);
// });

module.exports = app;
