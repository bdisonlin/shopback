const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var conf = require('./conf');
const routes = require("./routes/app.routes");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to shopback application." });
});

app.use('/shopback', routes);

app.listen(conf.port, conf.host, function () {
  console.log('app listening on port ' + conf.port + '!');
});
