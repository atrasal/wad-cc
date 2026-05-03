const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let tasks = [];

app.get('/tasks',(req, res) => {
    res.json(tasks);
})

app.post('/tasks', (req, res) =>{
    tasks.push(req.body);
    res.json({message: 'Task added successfully'});
});

app.put('/tasks/:index', (req, res)=>{
    let i = req.params.index;
    tasks[i]= req.body;
    res.json({message: 'Task updated successfully'});
});

app.delete('/tasks/:index', (req,res) =>{
    let i = req.params.index;
    tasks.splice(i,1);
    res.json({message: 'Task deleted successfully'});
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
