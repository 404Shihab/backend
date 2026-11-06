const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from users world');
});

const users = [
    {id:1, name: 'Kalim', email: 'kalim@some.com'},
    {id:2, name: 'Salim', email: 'salim@some.com'},
    {id:3, name: 'Dalim', email: 'dalim@some.com'}
]

app.get('/users', (req, res)=>{
    res.send(users)
})

app.post('/users', (req,res)=>{
    console.log('data in the request:', req.body);


    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.send({ success: true, data:newUser,   message: 'Post method is working'});
})

app.get('/products', (req,res)=>{
    res.send('Products are here')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});