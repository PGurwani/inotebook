import '../src/components/Navbar'
import Navbar from '../src/components/Navbar';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Routeexact path="/">
            <Home/>
          </Routeexact>
          <Route exact path="/about">
            <About/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
