import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../Redux/Features/userSlice";

export const UserId = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getUser = async () => {
            const user = await axios.get(
                "https://inventory-manager-server-jewel.herokuapp.com/auth/loggedIn"
            );
            if (user.data.id) {
                dispatch(userActions.isUser());
            }
        };
        getUser();
    }, [dispatch]);
};
