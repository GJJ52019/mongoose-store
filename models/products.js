const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description:{type: String, required: true},
	img: { type: String, required: false},
	price: {type: Number, required: true},
	qty: { type: Number, required: true }
});

const Products = mongoose.model('Product', productSchema);

module.exports = Products;