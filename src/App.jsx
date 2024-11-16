import logo from './logo.svg';
import './App.css';

import Services from './modules/services';
import Providers from './modules/providers';
import { MainMenu } from './Mainmenu';

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
 
  return (
    <div className="App">
      
      <Router>
        <MainMenu/>
        <Routes>
          <Route path = "/services" element = {<Services />}/>
          <Route path = "/providers" element = {<Providers/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;