const fs = require("fs");

const express = require("express"),
  app = express(),
  PORT = 3001,
  cors = require("cors");

app.use(express.static("root/public"));

app.use(cors());
app.use(express.json());

const fileRouter = require("./router/file.router.js")
app.use("/files",fileRouter)

app.listen(PORT, () => console.log(`Server is up - port ${PORT}`));
