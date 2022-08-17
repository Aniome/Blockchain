import { Blockchain } from "./Blockchain.js";

let blockchain = new Blockchain();
var data = {
	manufacter: "AMD",
	name_of_product: "Ryzen 5 3600",
	date_of_manufacture: new Date(2019, 6, 15, 19, 0, 0),
	product_description: "Processor",
};
let block = blockchain.new_block(0, data);
let block_string = JSON.stringify(block);
//blockchain.proof_of_work(0);
console.log(blockchain.last_block);
