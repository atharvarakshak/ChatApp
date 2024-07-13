const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const RegisterModel = require('./models/register')
// const bcrypt = require('bcrypt');

const bcrypt = require('bcryptjs');


const app = express();

require('dotenv').config();




app.use(cors({
    origin:['https://chat-app-seven-roan.vercel.app'],
    // origin:["http://localhost:5173"],
    method:["POST","GET"],
    credentials:true
}));
app.use(express.json());



mongoose.connect(process.env.MONGO_URL) .then(()=>{
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
            const hashPassword = bcrypt.hash(password, 10);
           const user = RegisterModel.create({name: name, email: email, password: hashPassword})
            .then(result => {res.json(result);
                delete user.password;

            })
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})

const server = app.listen(process.env.PORT ,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`);
 
})