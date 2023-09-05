import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const DeleteIcon = ({ handleDelete }) => {
    const theme = useTheme();
    return (
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <Delete
                style={{
                    color: theme.palette.secondary.main,
                }}
            />
        </IconButton>
    );
};

export default DeleteIcon;
