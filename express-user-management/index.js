const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

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

app.get('/products', (req,res)=>{
    res.send('Products are here')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});