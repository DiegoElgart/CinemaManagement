const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = 3000;

// const membersRoutes = require("./Routes/membersRoutes");
// const moviesRoutes = require("./Routes/moviesRoutes");
// const subscriptionsRoutes = require("./Routes/subscriptionsRoutes");

app.use(express.json());
app.use(cors());

connectDB();

app.listen(PORT, () =>
    console.log(`CinemaWS listening at http://localhost:${PORT}`)
);
