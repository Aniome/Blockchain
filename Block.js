export class Block {
	constructor(proof, info, previous_hash = null) {
		this.index = Block.count + 1;
		this.timestamp = new Date().getTime();
		this.proof = proof;
		this.previous_hash = previous_hash;
		// Производитель
		this.manufacter = info.manufacter;
		// Наименование товара
		this.name_of_product = info.name_of_product;
		// Дата производства
		this.date_of_manufacture = info.date_of_manufacture;
		// Описание товара
		this.product_description = info.product_description;
	}
	static count = 0;
}

/*

var data = {
  manufacter: "AMD",
  name_of_product: "Ryzen 5 3600",
  date_of_manufacture: new Date(2019, 6, 15, 19, 0, 0),
  product_description: "Processor",
};
let block = new Block(0, data, 0);
console.log(block);

class Block:
    def in_dict(self):
        dict = {"index": self.index,
                "timestamp": self.timestamp,
                "proof": self.proof,
                "previous_hash": self.previous_hash,
                "manufacturer": self.manufacturer,
                "name_of_product": self.name_of_product,
                "date_of_manufacture": self.date_of_manufacture,
                "product_description": self.product_description}
        return dict
    count = 0
*/
