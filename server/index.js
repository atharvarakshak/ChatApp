const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const RegisterModel = require('./models/register')
// const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const bcrypt = require('bcryptjs');


const app = express();

require('dotenv').config();


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));  



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
    .then(async (user) => {
        if(user) {
            res.json("Already have an account");
        } else {
            const salt =  await bcrypt.genSalt(10);
            let secPassword = await bcrypt.hash(password, salt);
             
          RegisterModel.create({name: name, email: email, password: secPassword})
            .then(result => {res.json(result);
         

            })
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})

const server = app.listen(process.env.PORT ,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`);
 
})