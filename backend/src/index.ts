import * as express from "express";
import * as sqlite3 from "sqlite3";
var cors = require("cors");
var db = new sqlite3.Database("db");
const app = express();

app.use(cors());
app.get("/", function (req, res) {
  db.all("SELECT * FROM farmers_markets_from_usda", (err, data) => {
    res.send(data);
  });
});

app.listen(3000);
