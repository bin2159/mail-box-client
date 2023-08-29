
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import NavBar from "./pages/NavBar"
import Logout from "./components/Logout";

function App() {
   
  return (

  <Router>
    <NavBar/>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/logout' element={<Logout/>}/>
    </Routes>
  </Router>
    
  );
}

export default App;
