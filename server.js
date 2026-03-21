const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// 🔹 PASTE YOUR CONNECTION STRING HERE
mongoose.connect("mongodb://admin:admin123@ac-ilwszzj-shard-00-00.tx8c9pi.mongodb.net:27017,ac-ilwszzj-shard-00-01.tx8c9pi.mongodb.net:27017,ac-ilwszzj-shard-00-02.tx8c9pi.mongodb.net:27017/?ssl=true&replicaSet=atlas-bkl1ej-shard-0&authSource=admin&appName=Cluster21")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// Schema (structure of data)
const SensorSchema = new mongoose.Schema({
    temperature: Number,
    gas: Number,
    humidity: Number
});

const Sensor = mongoose.model("Sensor", SensorSchema);

// Test route
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Save data to MongoDB
app.post("/sensor", async (req, res) => {
    const newData = new Sensor({
        temperature: req.body.temperature,
        gas: req.body.gas,
        humidity: req.body.humidity
    });

    await newData.save();
    res.send("Data saved");
});

// Get data from MongoDB
app.get("/sensor", async (req, res) => {
    const data = await Sensor.find();
    res.json(data);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});