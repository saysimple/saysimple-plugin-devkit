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
  res.send("Saysimple backend is running");
});

app.post("/proxy", (req, res) => {
  axios(req.body)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(error.response?.status ?? 500).send(
        error.response ?? {
          status: 500,
          statusText: "Internal server error",
          data: error,
        }
      );
    });
});

app.listen(port, () => {
  console.log(`Saysimple backend is running on port ${port}`);
});
