export class Block {
	/**
	 * Создает экземпляр Block.
	 * @constructor
	 * @param {number} proof - Доказательство работы
	 * @param {Object} info - Объект с информацией
	 * @param {number} info.index - Индекс блока
	 * @param {string} info.manufacturer - Производитель
	 * @param {string} info.name_of_product - Наименование товара
	 * @param {string} info.date_of_manufacture - Дата производства
	 * @param {string} info.product_description - Описание товара
	 * @param {number} previous_hash - хэш предыдущего блока
	 */
	constructor(proof, previous_hash, info) {
		this.index = info.index;
		this.timestamp = new Date().getTime();
		this.proof = proof;
		this.previous_hash = previous_hash;
		this.manufacturer = info.manufacturer;
		this.name_of_product = info.name_of_product;
		this.date_of_manufacture = info.date_of_manufacture;
		this.product_description = info.product_description;
	}
}
