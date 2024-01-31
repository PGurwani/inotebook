//1 state banayenge jo sabko accessable hongi
// import React, { useState } from "react";
import noteContext from "./noteContext"
import { useState } from "react";
const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "65acf78911750c57b272059d",
            "user": "659fd66f06033c3c584352d8",
            "title": "My title",
            "description": "PLease wake up early",
            "tag": "personal",
            "date": "2024-01-21T10:52:57.544Z",
            "__v": 0
        },
        {
            "_id": "65acf78911750c57b272059f",
            "user": "659fd66f06033c3c584352d8",
            "title": "My title",
            "description": "PLease wake up early",
            "tag": "personal",
            "date": "2024-01-21T10:52:57.690Z",
            "__v": 0
        },

    ]
    const[notes, setNotes] = useState(notesInitial)
    return (       //1 object hai jisme state ki value state hai aur update ki value update hai
        <noteContext.Provider value={{notes, setNotes}}   >  
            {props.children}
        </noteContext.Provider>     //iska matlab ye hai ki agar hum koi functon bhi export karte hai apni state ko use karne ke liye tho vo kaam karenga value ke aandar ka function
        // value{{state : state, update:update}}     hum unsare function ko exports kar sagte hai jo hamarre notes ko update kar sagte hai
    )
}

// jo bhi cheej provide karni hai usko value= ke aandar daalni hoti hai  jab bhi context banana hai tab itna tho likna hota hi hai
export default NoteState;