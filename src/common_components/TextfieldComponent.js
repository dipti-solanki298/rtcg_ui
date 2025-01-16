import React from "react";
import TextField from "@mui/material/TextField";

const TextfieldComponent = ({ value, onChangeFunction, type="text" }) => {

    const handleChange = (e) => {
        onChangeFunction(e.target.value);
    };

    return (
        <TextField
        value={value}
        onChange={handleChange}
        variant="outlined"
        type={type}
        size="small"
        fullWidth
        />
    );
}

export default TextfieldComponent;