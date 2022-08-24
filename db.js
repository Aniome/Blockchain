import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/Blockchain";

export var connectDB = (async () => {
	try {
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB Connected: ${url}`);
	} catch (err) {
		console.error(err);
	}
})();
