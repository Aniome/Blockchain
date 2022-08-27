import { blockchain } from "./api.js";
import { Blockchain } from "./Blockchain.js";
import Block from "./Block.js";

class Controller {
	async mine(req, res) {
		const values = req.body;
		const last_block = await blockchain.last_block;
		let last_proof, previous_hash;
		if (last_block.length === 0) {
			last_proof = 0;
			previous_hash = 0;
		} else {
			last_proof = last_block.proof;
			previous_hash = Blockchain.hash(JSON.stringify(last_block));
		}
		const proof = blockchain.proof_of_work(last_proof);
		const block = await blockchain.new_block(proof, previous_hash, values);
		blockchain.generateQRcode(block);
		res.json(block);
	}

	async chain(req, res) {
		let response = {
			chain: await Block.find({}),
			length: blockchain.count,
		};
		res.status(200).json(response);
	}

	async nodes_register(req, res) {
		const nodes = req.body.nodes;
		for (let node of nodes) {
			await blockchain.register_node(node);
		}
		let response = {
			message: "Новые узлы добавлены",
			total_nodes: nodes,
		};
		res.status(201).json(response);
	}

	async nodes_resovle(req, res) {
		let ans = await blockchain.resolve_conflicts();
		let response;
		if (ans) {
			response = {
				message: "Наша цепь была замена",
				new_chain: await Block.find({}),
			};
		} else {
			response = {
				message: "Цепь находится в актуальном состоянии",
				new_chain: await Block.find({}),
			};
		}
		return res.status(200).json(response);
	}

	async checkqr(req, res) {
		let data = req.body;
		let chain = await Block.find({});
		for (let item of chain) {
			for (let property in data) {
				if (item[property] != data[property]) {
					return res.status(200).send(false);
				}
			}
		}
		return res.status(200).send(true);
	}
}

export default new Controller();
