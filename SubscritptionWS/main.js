const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
