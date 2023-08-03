import React, { useState } from "react";
import TextField from "@mui/material/TextField";

export default function FormTextField({ label, id, ...props }) {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div>
            <TextField
                id={id}
                name={id}
                label={label}
                value={value}
                required
                fullWidth
                margin="normal"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            ></TextField>
        </div>
    );
}
