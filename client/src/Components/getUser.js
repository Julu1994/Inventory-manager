import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { config } from "../config";
import { userActions } from "../Redux/Features/userSlice";

export const UserId = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getUser = async () => {
            const user = await axios.get(
                `${config.SERVER_LINK}/auth/loginedIn`
            );
            if (user.data.id) {
                dispatch(userActions.isUser());
            }
        };
        getUser();
    }, [dispatch]);
};
