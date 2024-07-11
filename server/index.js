const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const RegisterModel = require('./models/register')


const app = express();

require('dotenv').config();


app.use(cors({
    origin:'https://chat-app-seven-roan.vercel.app',
    method:["POST","GET"],
    credentials:true
}));
app.use(express.json());

MONGO_URL = "mongodb+srv://atharvarakshak23:mM7LtGuS7BwTFQ11@cluster0.dlwp2a9.mongodb.net/chat-app?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGO_URL) .then(()=>{
    console.log('Connected to MongoDB');

}).catch((err)=>{
    console.log(err.message);
});


app.get("/",(req,res)=>{
    res.send('Hello World');
});

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})

const server = app.listen(5000 ,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`);
})