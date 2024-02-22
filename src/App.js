import "./App.css";
import Signup from "./components/signup";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Todos from "./components/todos";

function App() {
  return (
    <div className="App">
      {/*define all routes*/}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Todos />} />
      </Routes>
    </div>
  );
}

export default App;
