const express = require('express');
const app = express();
const cors = require('cors');
const  {MongoClient, ServerApiVersion} = require('mongodb');
const { version } = require('react');
const port = process.env.PORT || 8000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://simpleCurdUser:hrukkY6sHAOvU0nb@cluster0.5zri8hr.mongodb.net/`;

const client = new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict:true,
        deprecationErrors: true,
    }
});

app.get('/',(req,res)=>{
    res.send('Hello from simple crud server !!!!');
})

// const run = async


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


// 

// 


// 
// mongodb+srv://<db_username>:<db_password>@cluster0.5zri8hr.mongodb.net/
