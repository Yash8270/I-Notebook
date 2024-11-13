const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inote?directConnection=true";

const connectToMongo =  () => {
   mongoose.connect(mongoURI)
   .then((success) => console.log("Mongodb connnected successfully"))
   .catch((err) => console.log(err.message));
} 

module.exports = connectToMongo;