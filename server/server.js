const express = require('express');
const bodyparser = require('body-parser');
const _ = require('lodash')
const cors = require('cors')
const {ObjectId} = require('mongodb');

const app = express();


app.use(cors({origin: 'http://localhost:8080', credentials: true})) 


const {
    mongoose
} = require('./db/mongoosedb');
const {
    Notes
} = require('./model/Notes');
const {
    User
} = require('./model/user');



app.use(bodyparser.json());


app.post('/addnotes' , (req, res) => {
    
    
    let body = _.pick((req.body) , ['userId' , 'note'])
    let newNote = new Notes(body);
    
    newNote.save()
     .then(() => { res.status(200).send(JSON.stringify(newNote))})
     .catch(() => { res.status(400).send() })} )
         


app.post('/getnotes' , (req, res) => {
    
    let userId = _.pick(req.body, ['userId']);
    
    console.log(userId)
    
    if(Object.keys(userId).length === 0) { res.status(400).end()}
    
    Notes.find(userId)
     .then((docs) => { res.status(200).send(JSON.stringify(docs))})
     .catch(() => { res.status(400).send() })
    
})



app.post('/signup' , (req,res) => {
    
    let body = _.pick(req.body, ['userId', 'password']);
    User.findOne(body)
        .then((user)=> {if(user) { res.status(409).end()}})
    
    let newUser = new User(body);
    console.log(newUser)
    
    
    newUser.save()
        .then(()=> res.status(200).send(newUser.toJSON()))
        .catch((err) => {res.status(400).send(err)})})


app.post('/login' , (req,res) => {
    
    let body = _.pick(req.body, ['userId', 'password']);
    
    return User.findOne(body)
        .then((user)=> {
             
              if(!user) {res.status(404).send()}
              else {res.status(200).send(user.toJSON())} })
        .catch((err) => { console.log(err) ; res.status(400).send(err)})})
        

   app.listen(3000, console.log("Server running at 3000"))
