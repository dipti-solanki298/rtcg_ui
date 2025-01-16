import React from "react";
import Button from "@mui/material/Button";

const ButtonComponent = ({ onClickFunction, buttonText, buttonColor, textColor }) => {

    return (
        <Button
        onClick={(e) => onClickFunction(e)}
        variant="contained"
        fullWidth
        style={{ color: textColor, backgroundColor: buttonColor }}
        >
            {buttonText}
        </Button>
    );
}

export default ButtonComponent;