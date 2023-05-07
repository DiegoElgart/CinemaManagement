const mongoose = require("mongoose");

const connectDB = () => {
    mongoose
        .connect("mongodb://localhost:27017/CinemaWS")
        .then(() => console.log("Connected to CinemaWS!"))
        .catch(error => console.log(error));
};

module.exports = connectDB;
