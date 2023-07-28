import Button from '@mui/material/Button';


export default function SubmitButton ({onClick, ...props}) {
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onClick}
            {...props}
        ></Button>
    )
}
