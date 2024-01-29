import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
const About = () => {
  const  a = useContext(noteContext)
  useEffect(()=>{
    a.update()
  },[a])
  return (
    <div>
      This is my About {a.state.name}  and he is in division {a.state.class}
    </div>
  )
}

export default About
