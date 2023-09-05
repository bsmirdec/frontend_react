import React from "react";
import { useTheme } from "@mui/material";
import { TextField, IconButton, Box } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const QuantitySelector = ({ quantity, onIncrement, onDecrement }) => {
    const theme = useTheme();
    return (
        <div>
            <TextField
                value={quantity}
                size="string"
                InputProps={{
                    endAdornment: (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {onIncrement && (
                                <IconButton onClick={onIncrement} size="small">
                                    <Add
                                        style={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                </IconButton>
                            )}
                            <IconButton onClick={onDecrement} size="small">
                                <Remove
                                    style={{
                                        color: theme.palette.secondary.main,
                                    }}
                                />
                            </IconButton>
                        </Box>
                    ),
                }}
                inputProps={{
                    style: {
                        textAlign: "center",
                        width: "20px",
                    },
                }}
                variant="outlined"
            />
        </div>
    );
};

export default QuantitySelector;
