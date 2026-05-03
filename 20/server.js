const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB')
.then(()=>{
    console.log('Connected to MongoDB');
});

const employeeSchema = new mongoose.Schema({
    name: String, 
    department: String, 
    designation: String, 
    salary: Number, 
    joining: Date
});
const Employee = mongoose.model('employees', employeeSchema);

app.post('/add', async (req, res)=>{
    let emp = new Employee(req.body);
    await emp.save();
    res.send('Employee added successfully');
});

app.get('/employees', async (req,res)=>{
    let data = await Employee.find();
    res.json(data);
});
app.put('/update/:id', async (req,res)=>{
    await Employee.updateOne(
        {_id: req.params.id},
        req.body
    );
    res.send('Employee updated successfully');
});

app.delete('/delete/:id', async (req,res)=>{
    await Employee.deleteOne({_id: req.params.id});
    res.send('Employee deleted successfully');
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});