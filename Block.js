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
