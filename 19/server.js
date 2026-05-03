const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/student')
.then(() => console.log('Connected to MongoDB'));

const studentSchema = new mongoose.Schema({
    name: String,
    roll_no : Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_Marks: Number
});

const Student = mongoose.model('Student',studentSchema);

app.get('/insert', async (req,res) =>{
    await Student.insertMany([
        {name:"ABC", roll_no:111, WAD_Marks:25, CC_Marks:25, DSBDA_Marks:25, CNS_Marks:25, AI_Marks:25},
        {name:"DEF", roll_no:112, WAD_Marks:30, CC_Marks:22, DSBDA_Marks:18, CNS_Marks:28, AI_Marks:27},
        {name:"GHI", roll_no:113, WAD_Marks:20, CC_Marks:26, DSBDA_Marks:35, CNS_Marks:30, AI_Marks:29},
        {name:"JKL", roll_no:114, WAD_Marks:15, CC_Marks:18, DSBDA_Marks:12, CNS_Marks:20, AI_Marks:22},
        {name:"MNO", roll_no:115, WAD_Marks:28, CC_Marks:30, DSBDA_Marks:32, CNS_Marks:27, AI_Marks:26}
    ]);
    res.send("Data Inserted");
});

app.get('/students', async (req,res) =>{
    let students = await Student.find();
    let count = await Student.countDocuments();
    let html = `<h2>Total Students: ${count}</h2><table border="1">
    <tr>
    <th>Name</th><th>Roll</th><th>WAD</th><th>CC</th><th>DSBDA</th><th>CNS</th><th>AI</th>
    </tr>`;
    students.forEach(s => {
        html+=
        `<tr>
            <td>${s.name}</td>
            <td>${s.roll_no}</td>
            <td>${s.WAD_Marks}</td>
            <td>${s.CC_Marks}</td>
            <td>${s.DSBDA_Marks}</td>
            <td>${s.CNS_Marks}</td>
            <td>${s.AI_Marks}</td>
        </tr><br>`;
    });
    html+="</table>";
    res.send(html);
});

app.get('/dsbda', async (req,res)=>{
    let students = await Student.find({DSBDA_Marks: {$gt: 20}});
    res.json(students.map(s => s.name));
});

app.get('/update/:name', async (req,res)=>{
    await Student.updateOne(
        {name: req.params.name},
        {$inc: {WAD_Marks:10, CC_Marks:10, DSBDA_Marks:10, CNS_Marks:10, AI_Marks:10}}
    );
    res.send("Updated");
});

app.get('/topper', async (req,res)=>{
    let students = await Student.find({
        WAD_Marks: {$gt:25},
        CC_Marks: {$gt:25},
        DSBDA_Marks: {$gt:25},
        CNS_Marks: {$gt:25},
        AI_Marks: {$gt:25}
    });
    res.json(students.map(s=>s.name));
});

app.get('/fail', async (req,res)=>{
    let students = await Student.find({
        WAD_Marks: {$lt:40},
        CNS_Marks: {$lt:40}
    });
    res.json(students.map(s=>s.name));
});

app.get('/delete/:name', async (req,res)=>{
    await Student.deleteOne({name: req.params.name});
    res.send("Deleted");
});

app.listen(3000, ()=>{
    console.log("Server running on http://localhost:3000");
});