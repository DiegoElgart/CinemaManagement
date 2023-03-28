const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
    {
        MemberId: {
            type: Schema.Types.ObjectId,
            ref: "member",
            required: true,
        },
        Movies: [
            {
                movieId: {
                    type: Schema.Types.ObjectId,
                    ref: "movie",
                    required: true,
                },
                date: { type: Date, required: true },
            },
        ],
    },
    { versionKey: false }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
