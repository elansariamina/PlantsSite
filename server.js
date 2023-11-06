const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require("mongoose");
// const cors = require('cors');



const app = express();
const port = process.env.PORT || 4000; 
// app.use(bodyParser.json());
// app.use(cors());



const uri = 'mongodb://localhost:27017/plants'; 
const routes = require('./src/routes/plants.routes');

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch(err => {
    console.error("Could not connect to the database. Exiting now...", err);
    process.exit();
});

routes(app);
// async function connectToMongo() {
//     try {
//       await client.connect();
//       console.log('Connected to MongoDB');
  
//       const database = client.db(dbName);
  
//       app.listen(port, () => {
//         console.log(`Server is running on port ${port}`);
//       });
  
//       app.get('/api/plants', async (req, res) => {
//         const collection = database.collection('plants');
//         const plants = await collection.find({}).toArray();
//         res.json(plants);
//       });
  
//       app.get('/api/plants/:id', async (req, res) => {
//         const collection = database.collection('plants');
//         const id = req.params.id;
//         const plant = await collection.findOne({ _id: new ObjectId(id) });
//         res.json(plant);
//       });
  
//       app.delete('/api/plants/:id', async (req, res) => {
//         const collection = database.collection('plants');
//         const id = req.params.id;
//         await collection.deleteOne({ _id: new ObjectId(id) });
//         res.sendStatus(200);
//       });
//     } catch (err) {
//       console.error('Error connecting to MongoDB: ', err);
//     }
//   }
  
//   connectToMongo();
