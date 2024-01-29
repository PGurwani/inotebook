import '../src/components/Navbar'
import Navbar from '../src/components/Navbar';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
function App() {
  return (
    <>
      <NoteState>
        <Router>    
          <Navbar />
          <div className="container">    
          <Routes>    
            <Route path="/" element = {<Home />} />
            <Route path = "/about" element = {<About/> }/>
          </Routes>
          </div>
        </Router>
      </NoteState>     
    </>
  );
}
// Switch ko Routes ne replace kar diya hai ROutes ke saath element use karna hota hai abhi
//container class se cheeje center me aa jati hai
export default App;
