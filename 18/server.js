const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/music');

const songSchema = new mongoose.Schema({
    songname: String,
    film: String,
    music_director: String,
    singer: String,
    actor: String,
    actress: String
});

const Song = mongoose.model('Song', songSchema);

app.get('/insert', async (req,res)=>{
    await Song.insertMany([
        {songname: 'Tum Hi Ho', film: 'Aashiqui 2', music_director: 'Mithoon', singer: 'Arijit Singh', actor: 'Aditya Roy Kapoor', actress: 'Shraddha Kapoor'},
        {songname: 'Channa Mereya', film: 'Ae Dil Hai Mushkil', music_director: 'Pritam', singer: 'Arijit Singh', actor: 'Ranbir Kapoor', actress: 'Anushka Sharma'},
        {songname: 'Tujh Mein Rab Dikhta Hai', film: 'Rab Ne Bana Di Jodi', music_director: 'Salim-Sulaiman', singer: 'Roop Kumar Rathod', actor: 'Shah Rukh Khan', actress: 'Anushka Sharma'},
        {songname: 'Kal Ho Naa Ho', film: 'Kal Ho Naa Ho', music_director: 'Shankar-Ehsaan-Loy', singer: 'Sonu Nigam', actor: 'Shah Rukh Khan', actress: 'Preity Zinta'},
        {songname: 'Pee Loon', film: 'Once Upon a Time in Mumbaai', music_director: 'Pritam', singer: 'Mohit Chauhan', actor: 'Emraan Hashmi', actress: 'Prachi Desai'}
    ]);
    res.send("Data Inserted");
})

app.get('/songs', async (req,res)=>{
    let songs = await Song.find();
    let count = await Song.countDocuments();
    let html = `<h2>Total Songs: ${count}</h2><table border="1">`;

    songs.forEach(s => {
        html+=
        `<tr>
            <td>${s.songname}</td>
            <td>${s.film}</td>
            <td>${s.music_director}</td>
            <td>${s.singer}</td>
            <td>${s.actor}</td>
            <td>${s.actress}</td>
        </tr><br>`;
    });

    html+="</table>";
    res.send(html);
});

app.get('/director/:name', async (req,res) =>{
    let songs = await Song.find({music_director: req.params.name});
    res.json(songs);
})

app.get('/director-singer/:d/:s', async (req,res) =>{
    let songs = await Song.find({
        music_director: req.params.d,
        singer: req.params.s
    });
    res.json(songs);
});

app.get('/delete/:name', async (req,res) =>{
    await Song.deleteOne({songname: req.params.name});
    res.send('Song deleted successfully');
});

app.get('/add', async (req,res) =>{
    await Song.create({
        songname: 'Tera Ban Jaunga',
        film: 'Kabir Singh',
        music_director: 'Amit Trivedi',
        singer: 'Akhil Sachdeva',
        actor: 'Shahid Kapoor',
        actress: 'Kiara Advani'
    });
    res.send('Song added successfully');
});

app.get('/filter/:s/:f', async (req, res) => {
    let songs = await Song.find({
        singer: req.params.s,
        film: req.params.f
    });
    res.json(songs);
});

app.get('/update/:name', async (req,res) =>{
    await Song.updateOne(
        {songname: req.params.name},
        {actor: 'Shah Rukh Khan', actress: 'Anushka Sharma'}
    );
    res.send('Song updated successfully');
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});