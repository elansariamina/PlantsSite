const mongoose = require("mongoose");
    const commandSchema = new mongoose.Schema(
        {
            numero: Number,
            client: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Client",
            },
            plants: [
                {
                    plant: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Plant",
                    },
                    quantity: Number,
                },
            ],
        },
        { timestamps: true }
    );

    commandSchema.methods.toJson = function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    };

    const Command = mongoose.model("Command", commandSchema);

    module.exports = { Command };

