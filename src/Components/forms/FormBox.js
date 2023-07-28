import Box from '@mui/material/Box';


export default function FormBox ({children, ...props}) {
    return (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          {...props}
        >
          {children}
        </Box>
    )
}