const express = require("express");
const cors = require("cors");
const auth = require("./middleware/authMiddelware");
const connectDB = require("./config/db");
const app = express();
const PORT = 3000;

const membersRoutes = require("./routes/membersRoute");
const moviesRoutes = require("./routes/moviesRoute");
// const subscriptionsRoutes = require("./Routes/subscriptionsRoutes");
const authRouter = require("./routes/authRoute");

app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", authRouter);
app.use("/members", membersRoutes);
app.use("/movies", moviesRoutes);
app.listen(PORT, () =>
    console.log(`CinemaWS listening at http://localhost:${PORT}`)
);
