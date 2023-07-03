const express = require("express");
const cors = require("cors");
const auth = require("./middleware/authMiddelware");
const connectDB = require("./config/db");
const app = express();
const PORT = 3000;

const membersRoutes = require("./routes/membersRoute");
const moviesRoutes = require("./routes/moviesRoute");
const subscriptionsRoute = require("./routes/subscriptionsRoute");
const authRouter = require("./routes/authRoute");
const permissionRoute = require("./routes/permissionsRoute");
const userRoute = require("./routes/userRoute");

app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", authRouter);
app.use("/user", userRoute);
app.use("/members", auth, membersRoutes);
app.use("/movies", auth, moviesRoutes);
app.use("/subscriptions", auth, subscriptionsRoute);
app.use("/permissions", auth, permissionRoute);
app.listen(PORT, () => console.log(`CinemaWS listening at http://localhost:${PORT}`));
