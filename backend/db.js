const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/inotebook'

const connectToMongo = () =>{
mongoose.connect(mongoURI)
.then(()=>{
    console.log("Connected to MongoDB Successfully");
})
.catch((error)=>{
    console.log("Error connecting to MOngoDb", error.message)
});

};

module.exports = connectToMongo;