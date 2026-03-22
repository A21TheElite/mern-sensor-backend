// We changed package.json to "type": "module"
// So we use import/export instead of require()
// This is the modern JS way — same as what React uses

import express  from 'express'
import mongoose from 'mongoose'
import cors     from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect("mongodb://admin:admin123@ac-ilwszzj-shard-00-00.tx8c9pi.mongodb.net:27017,ac-ilwszzj-shard-00-01.tx8c9pi.mongodb.net:27017,ac-ilwszzj-shard-00-02.tx8c9pi.mongodb.net:27017/?ssl=true&replicaSet=atlas-bkl1ej-shard-0&authSource=admin&appName=Cluster21")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

const SensorSchema = new mongoose.Schema({
  temperature: Number,
  gas:         Number,
  humidity:    Number,
})

const Sensor = mongoose.model("Sensor", SensorSchema)

app.get("/", (req, res) => {
  res.send("Server is running!")
})

app.post("/sensor", async (req, res) => {
  const newData = new Sensor({
    temperature: req.body.temperature,
    gas:         req.body.gas,
    humidity:    req.body.humidity,
  })
  await newData.save()
  res.send("Data saved")
})

app.get("/sensor", async (req, res) => {
  const data = await Sensor.find()
  res.json(data)
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})
