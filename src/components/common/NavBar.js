import React, { useState, useContext, useEffect } from 'react';
import { Switch, Link, Menu, MenuItem, Box, Button, Typography, Toolbar, AppBar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import UserUtil from '../util/UserUtil'
import { userContext }  from '../context/UserContext'
import { themeContext } from '../context/ThemeContext'
import { dialogContext } from '../context/DialogContext'
import { reactLocalStorage } from 'reactjs-localstorage';
import DialogModel from '../model/DialogModel'

function NavBar() {

    const dialogManager = useContext(dialogContext)
    const userManager = useContext(userContext)
    const themeManager = useContext(themeContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const [checked, setChecked] = useState(themeManager.darkTheme);


    useEffect(()=>{
        themeManager.updateDarkTheme(checked)
    },[checked, themeManager])

    const handleMenuPopup = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleMenuDismiss = () => {
        setAnchorEl(null)
    }

    const login = () => {
        UserUtil.login().then((loggedInUser)=>{
            userManager.updateUser(loggedInUser)
        }).catch((error)=> {
            const dialog = new DialogModel("Message", error, "Ok")
            dialogManager.updateDialogMsg(dialog)
        })
    }

    const toggleTheme = () => {
        setChecked((prev) => !prev);
    }

    const logout = () => {
        UserUtil.logout().then(()=> {
            userManager.updateUser(null)
            reactLocalStorage.clear()
            
        })
    }

    return (
        <AppBar color="transparent" position="static">
            <Toolbar>
                <Box>
                    <MenuIcon aria-controls="quickMenu" aria-haspopup="true" onClick={handleMenuPopup} />
                    <Menu id="quickMenu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuDismiss}>
                        <MenuItem onClick={handleMenuDismiss}>
                            <Link href="/" color="textPrimary">
                                Home
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuDismiss}>
                            <Link href="/upload" color="textPrimary">
                                Upload
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuDismiss}>
                            <Link color="textPrimary">
                                Night
                            </Link>
                            <Switch size="small" color="primary" checked={checked} onChange={toggleTheme} />
                        </MenuItem>
                    </Menu>
                </Box>
                <Box flexGrow={1} px={2}>
                    <Typography variant="h6">
                        Processr
                    </Typography>
                </Box>
                { 
                    userManager.user ?
                        <Box>
                            <Typography variant="caption">
                                {userManager.user.displayName}
                            </Typography>
                            <Button varianet="contained" onClick={logout}>
                                Sign out
                            </Button>
                        </Box>
                        :
                        <Box alignItems="right">
                            <Button varianet="contained" onClick={login}>
                                Sign in
                            </Button>
                        </Box>
                }
            </Toolbar>
        </AppBar>
    )
}

export default NavBar