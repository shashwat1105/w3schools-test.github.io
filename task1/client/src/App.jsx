import { BrowserRouter as Router,Routes,Route } from "react-router-dom" 
import Login from "./Login"
import Register from "./Register"
import Home from "./Home"
 const App = () => {
   return (
     <Router>
      <Routes>
        <Route path="/" exact element={<Login/>}/>
        <Route path="/home" exact element={<Home/>}/>
        <Route path="/register" exact element={<Register/>}/>
      </Routes>
      </Router>
   )
 }
 
 export default App