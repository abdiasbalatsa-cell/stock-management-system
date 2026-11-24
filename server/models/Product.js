

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    name : {type: String, required : true},
    description : {type: String},
    category : {type: String},
    quantity : {type: Number, min: 0, required: true, default: 0},
    price : {type: Number, min: 0, required: true},

}, {
    timestamps: true
})

module.exports = mongoose.model("Product", ProductSchema);