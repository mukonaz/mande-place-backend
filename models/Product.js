const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    // Optional: add an image field if you want to add it back later
    // image: {
    //     type: String,
    // },
});

module.exports = mongoose.model('Product', productSchema);
