const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = 4000;

const membersRoutes = require("./Routes/membersRoutes");
const moviesRoutes = require("./Routes/moviesRoutes");
const subscriptionsRoutes = require("./Routes/subscriptionsRoutes");

app.use(express.json());
app.use(cors());

connectDB();

app.use("/members", membersRoutes);
app.use("/movies", moviesRoutes);
app.use("/subscriptions", subscriptionsRoutes);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
