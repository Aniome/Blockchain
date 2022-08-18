import { Blockchain } from "./Blockchain.js";

let blockchain = new Blockchain();
var data = {
	manufacter: "AMD",
	name_of_product: "Ryzen 5 3600",
	date_of_manufacture: new Date(2019, 6, 15, 19, 0, 0),
	product_description: "Processor",
};
let proof = blockchain.proof_of_work(0);
let block = blockchain.new_block(proof, data);
proof = blockchain.proof_of_work(proof);
blockchain.new_block(proof, data, Blockchain.hash(JSON.stringify(block)));
//let block_string = JSON.stringify(block);
//blockchain.proof_of_work(0);
//blockchain.register_node("http://192.168.0.5:5000");
console.log(blockchain.valid_chain(blockchain.chain));
//console.log(blockchain.nodes);
