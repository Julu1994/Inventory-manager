import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/header";
import Homepage from "./Pages/homepage";
import AddProduct from "./Pages/addProduct";
import Inbound from "./Pages/inbound";
import Shrink from "./Pages/shrink";
import Login from "./Pages/login";
import Register from "./Pages/register";
import axios from "axios";
import { useSelector } from "react-redux";
import Warning from "./Pages/warning";
import { UserId } from "./Components/getUser";
import Discount from "./Pages/discount";

axios.defaults.withCredentials = true;
function App() {
    const user = useSelector((state) => state.user.user);
    UserId();
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/inbound" element={<Inbound />} />
                <Route path="/shrink" element={<Shrink />} />
                <Route path="/discount" element={<Discount />} />
                <Route
                    path="/login"
                    element={!user ? <Login /> : <Warning />}
                />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
