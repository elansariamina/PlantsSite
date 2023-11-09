const mongoose = require("mongoose");
    const clientSchema = new mongoose.Schema(
        {
            name: String,
            tel: Number,
            address: String,
            email: String,
        },
        { timestamps: true }
    );

    clientSchema.methods.toJson = function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    };

    const Client = mongoose.model("Client", clientSchema);

    module.exports = { Client };

