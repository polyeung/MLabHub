import { Box } from '@mui/material';


interface loginPageProps { 
    setIsSignIn: (value: boolean) => void;
};
export default function loginPage({ setIsSignIn }: loginPageProps) { 
    
    return (
    <Box sx={{ mt: '10px' }}>
        Login Tab
    </Box>);
};