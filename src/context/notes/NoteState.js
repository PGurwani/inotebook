//1 state banayenge jo sabko accessable hongi
import React, { useState } from "react";
import NoteContext from "./noteContext"

const NoteState = (props) => {
    const s1 = {
        "name" : "Harry",
        "class" : "5b"
    }
    const [state, setState] = useState(s1);
    const update = () =>{
        setTimeout(()=>{
            setState({
                "name" : "Larry",
                "class" : "10b"
            })
        },1000);
    }
    //idhar value hamari noteState ko provide kar rahi hai
    return (       //1 object hai jisme state ki value state hai aur update ki value update hai
        <NoteContext.Provider value={{state, update}}   >          
            {props.children}        
        </NoteContext.Provider>     //iska matlab ye hai ki agar hum koi functon bhi export karte hai apni state ko us karne ke liye tho vo kaam karenga value ke aandar ka function
         // value{{state : state, update:update}}     hum unsare function ko exports kar sagte hai jo hamarre notes ko update kar sagte hai
    )
}

// jo bhi cheej provide karni hai usko value= ke aandar daalni hoti hai  jab bhi context banana hai tab itna tho likna hota hi hai
export default NoteState;