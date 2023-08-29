const expresss = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const server = express();
server.use(morgan("dev"));
server.useo(bodyParser());
server.use(cookieParser());
server.use(cors());

server.get("/api", (req, res) => {
  res.json({ time: Date().toString() });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
