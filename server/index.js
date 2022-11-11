// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require("axios");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors");
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Express is running!");
});

app.post("/proxy", (req, res) => {
  axios(req.body).then((response) => {
    res.send(response.data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
