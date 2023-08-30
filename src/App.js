
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import NavBar from "./pages/NavBar"
import { useSelector } from "react-redux";

function App() {
   const login=useSelector(state=>state.auth.login)
  return (

  <Router>
    <NavBar/>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      {login&&<Route path='/home' element={<HomePage/>}/>}
    </Routes>
  </Router>
    
  );
}

export default App;
