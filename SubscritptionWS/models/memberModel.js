const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema(
    {
        Name: { type: String, required: true },
        Email: { type: String, required: true },
        City: { type: String, required: true },
    },
    { versionKey: false }
);

const Member = mongoose.model("member", memberSchema);

module.exports = Member;
