import Titlebar from "./components/Titlebar";
import Login from "./pages/Login";
import Greeting from "./pages/Greeting";
import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/global.css";

function App() {
    return (
        <div className="h-screen w-screen bg-[#2f2f2f] rounded-lg flex flex-col">
            <Titlebar />
            <main className="flex-1 w-full overflow-y-auto">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/greeting" element={<Greeting />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
