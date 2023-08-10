import React, { useState } from "react";
import TextField from "@mui/material/TextField";

export default function FormTextField({ label, id, ...props }) {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
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
                {...props}
            ></TextField>
        </div>
    );
}
