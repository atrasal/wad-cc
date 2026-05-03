const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static(__dirname));
app.get('/employees', (req,res)=>{
    fs.readFile('employee.json', 'utf8', (err,data)=>{
        if(err){
            res.status(500).send('Error reading data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})