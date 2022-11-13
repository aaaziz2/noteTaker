const express = require('express')
const path = require('path')
const uuid = require('./helpers/uuid');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express()
let dbNotes = require('./db/db.json')

// let noteArray = JSON.parse(dbNotes)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
)

app.get('/api/notes', (req, res) => {
    res.status(200).json(dbNotes)
})

app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`)
  
    const newNotes = {
    title: req.body.title,
    id: uuid(),
    text: req.body.text,
    };

    dbNotes.push(newNotes)

    const response = {
        status: 'success',
        body: newNotes,
      };
      
    res.status(201).json(response);
})

app.delete('/api/notes/:id', (req,res) => {

    console.info(`${req.method} request received to delete a note`)

    dbNotes.find((note, i) => {
      if(note.id == req.params.id){
        obj = i
      }
    })
    dbNotes.splice(obj,1)

    res.json(true)
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);