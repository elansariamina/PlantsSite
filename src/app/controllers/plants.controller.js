const { Plant } = require('../models/plants.model');

// Function to retrieve all plants
exports.findAll = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
} catch (err) {
    res.status(500).json({ error: "Failed to retrieve plants" });
}
};

// Function to delete a plant by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Plant.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Plant not found with id " + id,
        });
      }
      return Plant.find(); // Retrieve all plants after deletion
    })
    .then((plants) => {
      res.send({
        message: "Plant deleted successfully!",
        data: plants,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the plant.",
      });
    });
};
