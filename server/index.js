const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();


app.use(cors({
    origin:'https://chat-app.vercel.app',
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


const server = app.listen(process.env.PORT ,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`);
})