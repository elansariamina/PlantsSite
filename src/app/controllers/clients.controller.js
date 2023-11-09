const { Client } = require('../models/clients.model');


exports.findAll = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
} catch (err) {
    res.status(500).json({ error: "Failed to retrieve clients" });
}
};

exports.create = async (req, res) => {
    try {
        const newClient = new Client({
            name: req.body.name,
            tel: req.body.tel,
            address: req.body.address,
            email: req.body.email,
        });

        const savedClient = await newClient.save();
        res.status(201).json(savedClient.toJson());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.delete = (req, res) => {
  const id = req.params.id;

  Client.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Client not found with id " + id,
        });
      }
      return Client.find(); 
    })
    .then((clients) => {
      res.send({
        message: "Client deleted successfully!",
        data: clients,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the plant.",
      });
    });
};
