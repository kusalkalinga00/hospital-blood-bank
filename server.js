const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

//dot env config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
// test route
app.use("/api/v1/test", require("./routes/testRoutes"));

//register POST route
app.use("/api/v1/auth", require("./routes/authRoutes"));


//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server running ${process.env.DEV_Node} on port ${PORT}`.bgBlue.white
  );
});
