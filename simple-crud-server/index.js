const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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

        const db = client.db('simpleCrud');
        const userCollection = db.collection('users');

        app.get('/users', async(req, res)=>{
            const cursor = userCollection.find();
            const result =await cursor.toArray();
            res.send(result);
        });

        app.get('/users/:id', async(req, res)=>{
            const id = req.params.id;
            console.log('user id', id);
            const query = {
                _id: new ObjectId(id)
            }
            const user = await userCollection.findOne(query);
            console.log(req.params);
            res.send(user);
        })

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