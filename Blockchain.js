import { Block } from "./Block.js";
import crypto from "node:crypto";
import Url from "node:url";
import QRCode from "qrcode";
import fetch from "node-fetch";

export class Blockchain {
	constructor() {
		this.chain = [];
		this.nodes = new Set();
	}
	new_block(proof, info, previous_hash = null) {
		let block = new Block(proof, info, previous_hash);
		Block.count = Block.count + 1;
		this.chain.push(block);
		return block;
	}
	proof_of_work(last_proof) {
		let proof = 0;
		while (!this.#valid_proof(last_proof, proof)) {
			proof++;
		}
		return proof;
	}
	#valid_proof(last_proof, proof) {
		let guess = `${last_proof}${proof}`;
		let guess_hash = Blockchain.hash(guess);
		return guess_hash.substring(-1, 4) == "0000";
	}
	static hash(str) {
		return crypto.createHash("sha256").update(str).digest("hex");
	}
	register_node(address) {
		let parsed_url = Url.parse(address);
		this.nodes.add(parsed_url);
	}
	#valid_chain(chain) {
		let prev_block = chain[0];
		for (let i = 1; i < chain.length; i++) {
			let block = chain[i];
			if (block.previous_hash != Blockchain.hash(JSON.stringify(prev_block))) {
				return false;
			}
			if (!this.#valid_proof(prev_block.proof, block.proof)) {
				return false;
			}
			prev_block = block;
		}
		return true;
	}
	async resolve_conflicts() {
		let neighbours = this.nodes;
		let new_chain = null;
		let max_length = this.chain.length;
		for (let node of neighbours) {
			const response = await fetch(`${node.href}chain`);
			if (response.status == 200) {
				const data = await response.json();
				let length = data.length;
				let chain = data.chain;
				if (length > max_length && this.#valid_chain(chain)) {
					max_length = length;
					new_chain = chain;
				}
			}
		}
		if (new_chain) {
			this.chain = new_chain;
			return true;
		}
		return false;
	}
	generateQRcode(block) {
		QRCode.toFile(`${block.index}.png`, JSON.stringify(block));
	}
	get last_block() {
		return this.chain.at(-1);
	}
}
