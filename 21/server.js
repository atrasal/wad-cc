const express = require('express');
const mongoose = require('mongoose');
const { title } = require('node:process');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
.then(()=>{
    console.log('Connected to MongoDB');
})

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    genre: String
});

const Book = mongoose.model('Book', bookSchema);

app.post('/add', async (req, res)=>{
    let book = new Book(req.body);
    await book.save();
    res.send('Book added successfully');
});

app.get('/books', async (req,res)=>{
    let data = await Book.find();
    res.json(data);
});

app.put('/update/:id', async (req,res)=>{
    await Book.updateOne(
        {_id: req.params.id},
        req.body
    );
    res.send('Book updated successfully');
});

app.delete('/delete/:id', async (req,res)=>{
    await Book.deleteOne({_id: req.params.id});
    res.send('Book deleted successfully');
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});