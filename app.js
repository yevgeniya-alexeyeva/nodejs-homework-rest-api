const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.static("public"));
app.use("/api/contacts", require("./routes/api/contacts"));
app.use("/api/users", require("./routes/api/users"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, _, res, __) => {
  console.log("error.message", error.message);
  const { code = 500, message = "Server error" } = error;
  console.log("code", code);
  if (error.message.includes("validation failed")) {
    res.status(400).json({
      status: "fail",
      code: 400,
      message,
    });
    return;
  }
  if (error.code.includes("LIMIT_UNEXPECTED_FILE")) {
    res.status(400).json({
      status: "fail",
      code: 400,
      message,
    });
    return;
  }
  res.status(code).json({
    status: "fail",
    code,
    message,
  });
});

module.exports = app;
