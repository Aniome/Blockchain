import { Block } from "./Block.js";
import crypto from "node:crypto";
import Url from "node:url";

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
	valid_chain(chain) {
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
	resolve_conflicts() {
		let neighbours = this.nodes;
		let new_chain = null;
		let max_length = this.chain.length;
		for (node of neighbours) {
		}
	}
	get last_block() {
		return this.chain.at(-1);
	}
}

/*
    def resolve_conflicts(self):
        """
        Это алгоритм Консенсуса, он разрешает конфликты, 
        заменяя цепь на самую длинную в цепи
        True, если бы наша цепь была заменена, False, если нет.
        """
        neighbours = self.nodes
        new_chain = None
        # Ищем только цепи, длиннее нашей
        max_length = len(self.chain)
        # Захватываем и проверяем все цепи из всех узлов сети
        for node in neighbours:
            response = requests.get(f'http://{node}/chain')
            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']
                chain = self.in_class(chain)
                # Проверяем, является ли длина самой длинной, а цепь - валидной
                if length > max_length and self.valid_chain(chain):
                    max_length = length
                    new_chain = chain
        # Заменяем нашу цепь, если найдем другую валидную и более длинную
        if new_chain:
            self.chain = new_chain
            return True
        return False

    def generateQRcode(self, block):
        file = f'QR/{block.index}.png'
        block = block.in_dict()
        img = qrcode.make(block)
        img.save(file)
*/
