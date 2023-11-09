const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');



const app = express();
const port = process.env.PORT || 4000; 
app.use(bodyParser.json());
app.use(cors());



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
