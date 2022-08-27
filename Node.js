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

const Node = new mongoose.Schema({
	protocol: { type: String, require: true },
	slashes: { type: Boolean, require: true },
	host: { type: String, require: true },
	port: { type: String, require: true },
	hostname: { type: String, require: true },
	href: { type: String, require: true },
});

export default mongoose.model("nodes", Node);
