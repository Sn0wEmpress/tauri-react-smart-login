import Titlebar from "./components/Titlebar";
import Login from "./pages/Login";
import "./styles/global.css";

function App() {
    return (
        <div className="h-screen w-screen bg-[#2f2f2f] rounded-lg flex flex-col">
            <Titlebar />
            <main className="flex-1 w-full overflow-y-auto">
                <Login />
            </main>
        </div>
    );
}

export default App;
