/**
 * @module Blockchain
 */

import Block from "./Block.js";
import crypto from "node:crypto";
import Url from "node:url";
import QRCode from "qrcode";
import fetch from "node-fetch";
import Node from "./node.js";

export class Blockchain {
	count = 0;
	/**
	 * Создает экземпляр блокчейна
	 * @constructor
	 */
	/*constructor() {
		this.nodes = new Set();
	}*/
	/**
	 * Создает новый блок
	 * @param {number} proof - Доказательство работы
	 * @param {Object} info - Объект с информацией
	 * @param {string} info.manufacturer - Производитель
	 * @param {string} info.name_of_product - Наименование товара
	 * @param {string} info.date_of_manufacture - Дата производства
	 * @param {string} info.product_description - Описание товара
	 * @param {number} previous_hash - Хэш предыдущего блока
	 * @returns {Block} возвращает созданный блок
	 */
	async new_block(proof, previous_hash, info) {
		info.index = this.count + 1;
		this.count++;
		const block = await Block.create({
			index: info.index,
			timestamp: new Date().getTime(),
			proof: proof,
			previous_hash: previous_hash,
			manufacturer: info.manufacturer,
			name_of_product: info.name_of_product,
			date_of_manufacture: info.date_of_manufacture,
			product_description: info.product_description,
		});
		return block;
	}
	/**
	 * Нахождение доказательства работы
	 * @param {number} last_proof
	 * @returns {number} возвращает найденное доказательство
	 */
	proof_of_work(last_proof) {
		let proof = 0;
		while (!this.#valid_proof(last_proof, proof)) {
			proof++;
		}
		return proof;
	}
	/**
	 * Проверка доказательства работы
	 * @param {number} last_proof
	 * @param {number} proof
	 * @returns {boolean} true если на конце 4 нуля, в остальных случаях false
	 */
	#valid_proof(last_proof, proof) {
		let guess = `${last_proof}${proof}`;
		let guess_hash = Blockchain.hash(guess);
		return guess_hash.substring(-1, 4) == "0000";
	}
	/**
	 * Хэширование строки с помощью алгоритма SHA-256
	 * @param {string} str
	 * @returns {string} Возвращает хэшированную строку в 16-ичной системе
	 */
	static hash(str) {
		return crypto.createHash("sha256").update(str).digest("hex");
	}
	/**
	 * Добавляет адреса новых узлов. Пример адреса: http://127.0.0.1:5001
	 * @param {Array.string} address - Массив содержащий адреса узлов
	 */
	async register_node(address) {
		let parsed_url = Url.parse(address);
		await Node.create({
			protocol: parsed_url.protocol,
			slashes: parsed_url.slashes,
			host: parsed_url.host,
			port: parsed_url.port,
			hostname: parsed_url.hostname,
			href: parsed_url.href,
		});
	}
	/**
	 * Проверка цепи на валидность
	 * @param {Array.Block} chain - Массив с блоками
	 * @returns {boolean} true если цепь валидная, в остальных случаях false
	 */
	#valid_chain(chain) {
		let prev_block = chain[0];
		for (let i = 1; i < chain.length; i++) {
			let block = chain[i];
			if (block.previous_hash != Blockchain.hash(JSON.stringify(prev_block))) {
				return false;
			}
			if (!this.#valid_proof(prev_block.proof, block.proof)) {
				return false;
			}
			prev_block = block;
		}
		return true;
	}
	/**
	 * Проверка актуальности цепи, её замена в случае неактульности
	 * @returns {boolean} true если цепь заменена, false в остальных случаях
	 */
	async resolve_conflicts() {
		let neighbours = this.nodes;
		let new_chain = null;
		let max_length = this.chain.length;
		for (let node of neighbours) {
			const response = await fetch(`${node.href}chain`);
			if (response.status == 200) {
				const data = await response.json();
				let length = data.length;
				let chain = data.chain;
				if (length > max_length && this.#valid_chain(chain)) {
					max_length = length;
					new_chain = chain;
				}
			}
		}
		if (new_chain) {
			this.chain = new_chain;
			return true;
		}
		return false;
	}
	/**
	 * Создает файл с QR-кодом
	 * @param {Block} block - блок для которого необходимо создать QR-код
	 */
	generateQRcode(block) {
		QRCode.toFile(`QR/${block.index}.png`, JSON.stringify(block));
	}
	/**
	 * @return {Block} Возвращает последний блок из цепи
	 */
	get last_block() {
		return Block.find().sort({ index: -1 }).limit(1);
	}
}
