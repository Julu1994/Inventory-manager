import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/header";
import Homepage from "./Pages/homepage";
import AddProduct from "./Pages/addProduct";
function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<AddProduct />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
