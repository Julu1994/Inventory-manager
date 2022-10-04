import { Alert } from "@mui/material";
import React from "react";

const Warning = () => {
    return (
        <div>
            <Alert severity="warning">
                You can't login while you are loggedIn!
            </Alert>
        </div>
    );
};

export default Warning;
