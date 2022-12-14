import express from "express";
import { Blockchain } from "./Blockchain.js";
import Block from "./Block.js";
import router from "./router.js";
import { connectDB } from "./db.js";

export const blockchain = new Blockchain();
const app = express();

async function startApp() {
	const PORT = 5000;
	app.use(express.json());
	app.use("", router);
	app.listen(PORT);
	await connectDB;
}

startApp();
