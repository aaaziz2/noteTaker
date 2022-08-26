const express = require('express')
const path = require('path')
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;
const app = express()
const notes = require('./db/db.json')

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
    res.status(200).json(notes);
})

app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`)
  
    const newNotes = {
    title: req.body.title,
    id: uuid(),
    text: req.body.text,
    };
      
    readAndAppend(newNotes, './db/db.json')

    const response = {
        status: 'success',
        body: req.body,
      };
     
    console.log(req.body)
      
    res.status(201).json(response);
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// extra credit will work on that later
app.delete('/api/notes/:id', (req,res) => {

    console.info(`${req.method} request received to delete a note`)

    // let keys = Object.keys(notes)
    // for(let i = 0; i<keys.length; i++){
    //     if(keys[i] == id){
    //         index = notes.indexOf(i)
    //         notes.splice(index,1)
    //     }

    // }
})