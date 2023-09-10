const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

const Category = mongoose.model("Category", catSchema);

module.exports = Category;