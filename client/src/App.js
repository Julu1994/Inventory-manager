import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/header";
import Homepage from "./Pages/homepage";
import AddProduct from "./Pages/addProduct";
function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/add-product" element={<AddProduct />} />
            </Routes>
        </Router>
    );
}

export default App;
