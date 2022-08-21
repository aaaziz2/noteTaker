const express = require('express')
const path = require('path')
const uuid = require('./helpers/uuid');

const PORT = 3001;
const app = express()
const notes = require('./db/db.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.get('/api/notes', (req, res) => {
    res.status(200).json(notes);
})

app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`)
  
    const response = {
    status: 'success',
    id: uuid(),
    body: req.body,
    };
      
    console.log(response);
    notes.push(response)
    res.status(201).json(response);
})

app.delete('/api/notes/:id', (req,res) => {

    console.info(`${req.method} request received to delete a note`)

    let keys = Object.keys(notes)
    for(let i = 0; i<keys.length; i++){
        if(keys[i] == id){
            index = notes.indexOf(i)
            notes.splice(index,1)
        }

    }
})