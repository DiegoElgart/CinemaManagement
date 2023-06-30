const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
	{
		memberId: {
			type: Schema.Types.ObjectId,
			ref: "member",
			required: true,
		},
		movies: [
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

subscriptionSchema.methods.getMoviesForMember = function () {
	return this.populate("movies.movieId");
};

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
