import { blockchain } from "./index.js";
import { Blockchain } from "./Blockchain.js";
import Block from "./Block.js";
import Node from "./Node_.js";

class BlockchainService {
	async mine(values) {
		const last_block = await blockchain.last_block;
		let last_proof, previous_hash;
		if (blockchain.count == 0) {
			last_proof = 0;
			previous_hash = 0;
		} else {
			last_proof = last_block.proof;
			previous_hash = Blockchain.hash(JSON.stringify(last_block));
		}
		const proof = blockchain.proof_of_work(last_proof);
		const block = await blockchain.new_block(proof, previous_hash, values);
		blockchain.generateQRcode(block);
		return block;
	}

	async chain() {
		return {
			chain: await Block.find(),
			length: blockchain.count,
		};
	}

	async nodes_register(nodes) {
		for (let node of nodes) {
			await blockchain.register_node(node);
		}
		let response = {
			message: "Новые узлы добавлены",
			total_nodes: await Node.find(),
		};
		return response;
	}

	async nodes_resovle() {
		let ans = await blockchain.resolve_conflicts();
		let response;
		if (ans) {
			response = {
				message: "Наша цепь была замена",
				new_chain: await Block.find(),
			};
		} else {
			response = {
				message: "Цепь находится в актуальном состоянии",
				new_chain: await Block.find(),
			};
		}
		return response;
	}

	async checkqr(data) {
		const item = await Block.findOne({ index: data.index });
		for (let property in data) {
			if (item[property] != data[property]) {
				return false;
			}
		}
		return true;
	}
}

export default new BlockchainService();
