import { Block } from "./Block.js";
var crypto = require("crypto");

export class Blockchain {
	constructor() {
		this.chain = new Array();
		this.nodes = new Set();
	}
	new_block(proof, info, previous_hash = null) {
		let block = new Block(proof, info, previous_hash);
		Block.count = Block.count + 1;
		this.chain.push(block);
		return block;
	}
}

/*
    def register_node(self, address):
        """
        Вносим новый узел в список узлов
        адрес узла , другими словами: 'http://192.168.0.5:5000'
        """
        parsed_url = urlparse(address)
        self.nodes.add(parsed_url.netloc)

    def valid_chain(self, chain):
        """
        Проверяем, является ли внесенный в блок хеш корректным
        """
        last_block = chain[0]
        current_index = 1
        while current_index < len(chain):
            block = chain[current_index]
            # Проверяем правильность хеша блока
            if block.previous_hash != self.hash(last_block):
                return False
            # Проверяем, является ли подтверждение работы корректным
            if not self.valid_proof(last_block.proof, block.proof):
                return False
            last_block = block
            current_index += 1
        return True

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

    def proof_of_work(self, last_proof):
        """
        Простая проверка алгоритма:
            - Поиска числа p`, так как hash(pp`) содержит 4 заглавных нуля, где p - предыдущий
            - p является предыдущим доказательством, а p` - новым
        """
        proof = 0
        while self.valid_proof(last_proof, proof) is False:
            proof += 1
        return proof

    @staticmethod
    def valid_proof(last_proof, proof):
        """
        Подтверждение доказательства: Содержит ли hash(last_proof, proof) 4 заглавных нуля?
        """
        guess = f'{last_proof}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:4] == "0000"

    @staticmethod
    def hash(block):
        block_dict = block.in_dict()
        block_string = json.dumps(block_dict, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

    @property
    def last_block(self):
        return self.chain[-1]

    def generateQRcode(self, block):
        file = f'QR/{block.index}.png'
        block = block.in_dict()
        img = qrcode.make(block)
        img.save(file)
*/
