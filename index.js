const express = require('express');
const app = express();
const port = process.env.port || 5000;

app.get('/', (req, res) => {
    res.send('hello i am server')
})

app.listen(port, () =>{
    console.log('server is running and port:', port);
    
})
