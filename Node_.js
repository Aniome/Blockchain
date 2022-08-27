import mongoose from "mongoose";

/**
 * @param {string} protocol - Доказательство работы
 * @param {boolean} slashes - Объект с информацией
 * @param {string} host - Индекс блока
 * @param {string} port - Производитель
 * @param {string} hostname - Наименование товара
 * @param {string} href - Дата производства
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
