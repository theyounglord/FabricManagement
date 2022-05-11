// create a model for product
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    fabric_name: {
        type: String,
        required: true
    },
    // fabric_type is enum type
    fabric_type: {
        type: String,
        // add 'woven', 'knitted', 'non-woven' 
        enum: [ 'woven', 'knitted', 'non-woven' ],
        required: true
    },
    fabric_color: {
        type: String,
        required: true
    },
    fabric_composition: {
        type: Number,
        required: true
    },
    fabric_weight: {
        type: Number,
        required: true
    },
    fabric_width: {
        type: Number,
        required: true
    },
    fabric_count: {
        type: Number,
        required: true
    },
    fabric_quantity: {
        type: Number,
        required: true
    },
    fabric_price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // fabric_finish is enum type and it can be antimicrobial, anti-shrinkage, water-resistant, calendering, crease-resistant, other (custom)
    fabric_finish: {
        type: String,
        enum: [ 'antimicrobial', 'anti-shrinkage', 'water-resistant', 'calendering', 'crease-resistant', 'other (custom)' ],
        required: true
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model('Product', productSchema);
    