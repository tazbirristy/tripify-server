const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// middle wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2s00ahv.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client.db("tripify").collection("services");

    // get limit services data
    app.get("/services", async (req, res) => {
      const query = {};
      const sort = { time: -1 };
      const cursor = serviceCollection.find(query).sort(sort);
      const services = await cursor.limit(3).toArray();
      res.send(services);
    });
    // post services data
    app.post("/services", async (req, res) => {
      const service = req.body;
      const result = await serviceCollection.insertOne(service);
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Tripify server is running");
});

app.listen(port, () => {
  console.log(`Tripify server is running on ${port}`);
});
