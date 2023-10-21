const path = require('path')
import express from 'express'
import cors from 'cors'
import { Data } from '../src/interface'

const PORT = process.env.PORT || 8000
const app = express();


app.use(cors())
app.use(express.json());


let data : Data = new Data()
data.addList("My server list")


console.log("init server... listening to PORT:", PORT)

app.use(express.static(path.join(__dirname, '../build/')));

app.get("/getdata", (req, res) => {
  console.log("at /getdata ... Sending")
  res.send(data.__ToJSON())
});

app.post("/setdata", (req, res) => {
  console.log("at setdata ... Receiving")
  data = data.__FromJSON(JSON.stringify(req.body))
})

app.listen(PORT)