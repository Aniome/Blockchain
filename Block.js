import mongoose from "mongoose";

/**
 * @param {number} proof - Доказательство работы
 * @param {Object} info - Объект с информацией
 * @param {number} info.index - Индекс блока
 * @param {string} info.manufacturer - Производитель
 * @param {string} info.name_of_product - Наименование товара
 * @param {string} info.date_of_manufacture - Дата производства
 * @param {string} info.product_description - Описание товара
 * @param {string} previous_hash - хэш предыдущего блока
 */

const Block = new mongoose.Schema({
	index: { type: Number, require: true },
	timestamp: { type: String, require: true },
	proof: { type: Number, require: true },
	previous_hash: { type: String, require: true },
	manufacturer: { type: String, require: true },
	name_of_product: { type: String, require: true },
	date_of_manufacture: { type: String, require: true },
	product_description: { type: String, require: true },
});

export default mongoose.model("blocks", Block);
