
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Root from "./pages/Root";
import LoginPage from "./pages/LoginPage";

function App() {
   
  return (
  <Router>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
    </Routes>
  </Router>
    
  );
}

export default App;
