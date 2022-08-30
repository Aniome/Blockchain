import BlockchainService from "./BlockchainService.js";

class Controller {
	async mine(req, res) {
		const values = req.body;
		const block = await BlockchainService.mine(values);
		res.json(block);
	}

	async chain(req, res) {
		let response = await BlockchainService.chain();
		res.status(200).json(response);
	}

	async nodes_register(req, res) {
		const nodes = req.body.nodes;
		const response = await BlockchainService.nodes_register(nodes);
		res.status(201).json(response);
	}

	async nodes_resovle(req, res) {
		const response = await BlockchainService.nodes_resovle();
		return res.status(200).json(response);
	}

	async checkqr(req, res) {
		const ans = await BlockchainService.checkqr(req.body);
		return res.status(200).send(ans);
	}
}

export default new Controller();
