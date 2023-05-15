const express = require("express");
const cors = require("cors");
const auth = require("./middleware/authMiddelware");
const connectDB = require("./config/db");
const app = express();
const PORT = 3000;

const membersRoutes = require("./routes/membersRouter");
// const moviesRoutes = require("./Routes/moviesRoutes");
// const subscriptionsRoutes = require("./Routes/subscriptionsRoutes");
const authRouter = require("./routes/authRouter");

app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", authRouter);
app.use("/members", membersRoutes);

app.listen(PORT, () =>
    console.log(`CinemaWS listening at http://localhost:${PORT}`)
);
