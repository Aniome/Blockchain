import express from "express";
import { Blockchain } from "./Blockchain.js";

const PORT = 5000;
const app = express();
app.use(express.json());
const blockchain = new Blockchain();

app.post("/mine", (req, res) => {
	const values = req.body;
	const last_block = blockchain.last_block;
	let last_proof, previous_hash;
	if (last_block == undefined) {
		last_proof = 0;
		previous_hash = 0;
	} else {
		last_proof = last_block.proof;
		previous_hash = Blockchain.hash(JSON.stringify(last_block));
	}
	const proof = blockchain.proof_of_work(last_proof);
	const block = blockchain.new_block(proof, values, previous_hash);
	blockchain.generateQRcode(block);
	res.status(200).json(block);
});

app.get("/chain", (req, res) => {
	let response = {
		chain: blockchain.chain,
		length: blockchain.chain.length,
	};
	res.status(200).json(response);
});

app.get("/nodes/register", (req, res) => {
	const nodes = req.body.nodes;
	for (let node of nodes) {
		blockchain.register_node(node);
	}
	let response = {
		message: "Новые узлы добавлены",
		total_nodes: nodes,
	};
	res.status(201).json(response);
});

app.get("/nodes/resolve", (req, res) => {
	let response;
	blockchain.resolve_conflicts().then((ans) => {
		if (ans) {
			response = {
				message: "Наша цепь была замена",
				new_chain: blockchain.chain,
			};
		} else {
			response = {
				message: "Цепь находится в актуальном состоянии",
				new_chain: blockchain.chain,
			};
		}
		return res.status(200).json(response);
	});
});

app.listen(PORT);

/*
@app.route('/checkqr', methods=['POST'])
def checkQR():
    data = request.get_json()
    print(data)
    chain = blockchain.chain_in_dict()
    response = {}
    if data in chain:
        response["chain"] = True
        return jsonify(response), 200
    response["chain"] = False
    return jsonify(response), 200
 */
