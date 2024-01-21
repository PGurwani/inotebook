const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const {body, validationResult} = require('express-validator');

//Route 1 : Get all the notes using : GET "/api/notes/getuse". Login required 
// ye endpoint user ke notes fetch kar ke denga jo user already loggedin hai
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("INternal Server Error");
    }

})  //Route 2 : Add a new note using : Post "/api/notes/addnote". Login required 
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atlease 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //If there are errors, return BAd request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id

        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// Route 3 : Update an existing note usin : PUT " /api/auth/update.". Login required
// kaun se note ko update kar rahe hai uski id deni hogi
// updation ke liye put request ka istamal karte hai
// update wahi kar sagta hai jab tak ye validate nahi ho jata ki jo insan update kar raha hai note ussi ka hai
router.put('/updatenote/:id', fetchuser, async (req, res) =>{
    const { title, description, tag} = req.body;    // ye teeno hum body me se leke aaye hai
    try {
        //Create a newNote object
    const newNote = {};
    if(title){newNote.title = title};    // agr title aa raha hai to title ko update karo
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id)   // ye uper wala id hai javascript me nulll undefined 0 or an empty string ko falsy string consider kiya jata ahai
    if(!note){res.status(404).send("Not Found")}
    //  ab dekna hai ki jo user hai vo yahi hai ki nahi 

    if(note.user.toString() !== req.user.id)   //note.user.toString ko id denga
    {
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote}, {new: true})   //agar koi naya contact aata hai tho vo create ho jayenga
    res.json({note});
    } catch (error) {
        console.error(error.message);
    res.status(500).send("Interval Server Error");
    }
    
})
//ROUTE 4 : 
router.delete('/deletenote/:id', fetchuser, async (req, res) =>{
    const { title, description, tag} = req.body;    // ye teeno hum body me se leke aaye hai
    //pahale verify karna hoga ki jo insan delete kar raha hai vo note ussi ka hai
  try {
    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id)   // ye uper wala id hai javascript me nulll undefined 0 or an empty string ko falsy string consider kiya jata ahai
    if(!note){res.status(404).send("Not Found")}
    //  ab dekna hai ki jo user hai vo yahi hai ki nahi 
    // Allow deletation if the only user is authenticate
    if(note.user.toString() !== req.user.id)   //note.user.toString ko id denga
    {
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id)   //agar koi naya contact aata hai tho vo create ho jayenga
    res.json({"Success" : "Note has been deleted", note : note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Interval Server Error");
  }

    
})
module.exports = router