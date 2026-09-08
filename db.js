const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Mongo connect");
    }catch(err){
        console.log("connect failed");
    }
}

module.exports = connectDB;