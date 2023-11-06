const mongoose = require("mongoose");
    const plantSchema = new mongoose.Schema(
        {
            name: String,
            category: String,
            light: Number,
            water: Number,
            cover: String,
            price: Number
        },
        { timestamps: true }
    );

    plantSchema.methods.toJson = function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    };

    const Plant = mongoose.model("Plant", plantSchema);

    module.exports = { Plant };

