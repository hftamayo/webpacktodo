import Navbar from "./components/ui/dashboard/HeaderDashboard";
import FooterDashboard from "./components/ui/dashboard/FooterDashboard";
import Dashboard from "./Pages/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ViewStudents from "./components/entities/students/ViewStudents";
import EditStudent from "./components/entities/students/EditStudent";
import DetailStudent from "./components/entities/students/DetailStudent";
import AddStudent from "./components/entities/students/AddStudent";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="app flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />
        <ToastContainer position="bottom-left" />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<ViewStudents />} />
          <Route path="/student/:id" element={<DetailStudent />} />
          <Route path="/newstudent/" element={<AddStudent />} />"
          <Route path="/editstudent/:id" element={<EditStudent />} />
        </Routes>
        <FooterDashboard className="mt-auto"/>
      </BrowserRouter>
    </div>
  );
}

export default App;
