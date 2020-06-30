import express from "express";
import * as sqlite3 from "sqlite3";
import * as cors from 'cors'

const PORT = 3000
const db = new sqlite3.Database("db");
const app = express();

app.use(cors());
app.get("/", function (req, res) {
  db.all("SELECT * FROM farmers_markets_from_usda", (error, data) => {
    if (error) {
      console.log(JSON.stringify(error, null, 2))
      res.sendStatus(500)
    } else {
      res.send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Opening app on port ${PORT}`)
});

