const mongoose = require('mongoose');
const {Schema} = mongoose;

const NoteSchema = new Schema({
    user : {         // hum chahate hai ki koi user ke notes aur koi nahi dek sage uske liye hume ye add karna hoga
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
    },
    title:{
        type : String,
        required: true
    },
    description:{
        type: String,
        required : true,
    },
  
    tag:{
        type : String,
        default : "General"
    },

    date:{
        type:Date,
        default:Date.now
    },
});

module.exports = mongoose.model("notes", NoteSchema);