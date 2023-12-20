import Navbar from "./Pages/Navbar";
import Dashboard from "./Pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import ViewStudents from "./components/entities/students/ViewStudents";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<ViewStudents />} />        
      </Routes>
    </div>
  );
}

export default App;
