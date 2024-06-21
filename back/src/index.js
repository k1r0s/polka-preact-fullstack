import polka from "polka";
import bdparser from "body-parser";
import logger from "simple-express-logger";
import cors from "cors";

const { DB_INTERFACE, ENV="prod", PORT=80, COLS } = process.env;

const endWithJson = (cde, res) => obj => {
  res.writeHead(cde, { "Content-Type": "application/json" });
  if (obj) res.end(JSON.stringify(obj));
  else res.end("null");
}

const app = polka()
  .use(logger())
  .use(bdparser.json())

if (ENV === "dev") app.use(cors());

const { create, read, update, remove } = require(DB_INTERFACE);

COLS.split(",").forEach(col => {
  app.get("/", (req, res) =>
    res.end("Collections available: " + COLS));
  app.get(`/${col}`, (req, res) =>
    read(col).then(endWithJson(200, res)));
  app.get(`/${col}/:uid`, (req, res) =>
    read(col, req.params.uid).then(endWithJson(200, res)));
  app.delete(`/${col}/:uid`, (req, res) =>
    remove(col, req.params.uid).then(endWithJson(206, res)));
  app.put(`/${col}/:uid`, (req, res) =>
    update(col, req.params.uid, req.body).then(endWithJson(200, res)));
  app.post(`/${col}`, (req, res) =>
    create(col, req.body).then(endWithJson(201, res)));
})


app.listen(PORT, err => {
  if (err) throw err;
});
