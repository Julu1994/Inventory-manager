import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/header";
import Homepage from "./Pages/homepage";
import AddProduct from "./Pages/addProduct";
import Inbound from "./Pages/inbound";
import Shrink from "./Pages/shrink";
function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/inbound" element={<Inbound />} />
                <Route path="/shrink" element={<Shrink />} />
            </Routes>
        </Router>
    );
}

export default App;
