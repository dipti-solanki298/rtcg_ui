import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const NavBarComponenet = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    }
    return (
        <AppBar position="fixed" className="bg-black" style={{ backgroundColor: 'black' }}>
        <Toolbar className="flex justify-between items-center">
            <div className="flex items-center">
                <img 
                    src="https://www.indium.tech/wp-content/uploads/2023/11/footer-logo.png" 
                    alt="Logo" 
                    width={100} 
                    height={100} 
                    className="mr-2"
                />
            </div>
            <IconButton color="inherit" onClick={() => handleLogout()}>
                <LogoutIcon />
            </IconButton>
        </Toolbar>
        </AppBar>
    );
};

export default NavBarComponenet;
