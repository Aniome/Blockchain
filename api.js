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

app.listen(PORT, () => console.log("server start"));

/*
@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        'chain': blockchain.chain_in_dict(),
        'length': len(blockchain.chain),
    }
    return jsonify(response), 200


@app.route('/nodes/register', methods=['POST'])
def register_nodes():
    values = request.get_json()
    nodes = values.get('nodes')
    if nodes is None:
        return "Error: Please supply a valid list of nodes", 400
    for node in nodes:
        blockchain.register_node(node)
    response = {
        'message': 'New nodes have been added',
        'total_nodes': list(blockchain.nodes),
    }
    return jsonify(response), 201


@app.route('/nodes/resolve', methods=['GET'])
def consensus():
    replaced = blockchain.resolve_conflicts()
    chain = blockchain.chain_in_dict()
    if replaced:
        response = {
            'message': 'Our chain was replaced',
            'new_chain': chain
        }
    else:
        response = {
            'message': 'Our chain is authoritative',
            'chain': chain
        }
    return jsonify(response), 200


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
