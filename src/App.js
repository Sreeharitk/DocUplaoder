import { Route, Routes } from "react-router-dom";
import './App.css';
import Docs from "./components/Docs";
import { app, db } from "./lib/init-firebase";
import EditDocs from "./pages/EditDocs";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Docs database={db}/>}></Route>
        <Route path="/edit/:id" element={<EditDocs database={db}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
