const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        city: { type: String, required: true },
    },
    { versionKey: false }
);

const Member = mongoose.model("member", memberSchema);

module.exports = Member;
