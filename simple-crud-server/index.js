const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://simpleCurdUser:hrukkY6sHAOvU0nb@cluster0.5zri8hr.mongodb.net/`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.get('/', (req, res) => {
    res.send('Hello from simple crud server !!!!');
});

const run = async () => {
    try {
        await client.connect();

        await client.db('admin').command({ ping: 1 });

        console.log(
            "Pinged your deployment. You successfully connected to MongoDB"
        );
    }
    finally {
        // await client.close();
    }
};

run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});