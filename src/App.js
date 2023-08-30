
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import NavBar from "./pages/NavBar"

function App() {
   
  return (

  <Router>
    <NavBar/>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
    </Routes>
  </Router>
    
  );
}

export default App;
