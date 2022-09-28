import { Alert } from "@mui/material";
import React from "react";

const Warning = () => {
    return (
        <div>
            <Alert severity="warning">You need to logout first!</Alert>
        </div>
    );
};

export default Warning;
