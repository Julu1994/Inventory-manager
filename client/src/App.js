import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/homepage2";
import AddProduct from "./Pages/addProduct";
import Inbound from "./Pages/inbound";
import Shrink from "./Pages/shrink";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import axios from "axios";
import { useSelector } from "react-redux";
import Warning from "./Pages/warning";
import Discount from "./Pages/discount";
import { UserId } from "./Components/getUser";


axios.defaults.withCredentials = true;
function App() {
    const user = useSelector((state) => state.user.user);
    UserId();
    return (
        <Router>
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
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App;
