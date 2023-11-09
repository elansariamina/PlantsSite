const mongoose = require('mongoose');
const { Command } = require('../models/command.model');
const { Client } = require('../models/clients.model');
const { Plant } = require('../models/plants.model');

exports.create = async (req, res) => {
    try {
        const { numero, client, plants } = req.body;

        if (!mongoose.Types.ObjectId.isValid(client.id)) {
            return res.status(400).json({ error: 'Invalid Client ObjectId' });
        }

        if (!plants.every(plant => mongoose.Types.ObjectId.isValid(plant.plant._id))) {
            return res.status(400).json({ error: 'Invalid Plant ObjectId' });
        }

        const clientt = await Client.findById(client.id);

        if (!clientt) {
            return res.status(404).json({ error: 'Client not found' });
        }

        const plantIds = plants.map(plant => plant.plant._id);
        const plantt = await Plant.find({ _id: { $in: plantIds } });

        if (plantt.length !== plantIds.length) {
            return res.status(404).json({ error: 'One or more plants not found' });
        }

        const plantData = plants.map(plant => ({
            plant: plantt.find(p => p._id.equals(plant._id)),
            quantity: plant.quantity,
        }));

        const newCommand = new Command({
            numero,
            client: clientt,
            plants: plantData,
        });

        const savedCommand = await newCommand.save();
        res.status(201).json(savedCommand.toJson());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.findAll = async (req, res) => {
    try {
        const commands = await Command.find().populate('client plant');
        res.json(commands);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve commands' });
    }
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Command.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: 'Command not found with id ' + id,
                });
            }
            return Command.find();
        })
        .then((commands) => {
            res.send({
                message: 'Command deleted successfully!',
                data: commands,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while deleting the command.',
            });
        });
};
