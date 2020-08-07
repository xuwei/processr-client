
import React, { useContext } from 'react'
import { Hidden, Paper, Box, Typography, Button } from '@material-ui/core'
import GoogleButton from 'react-google-button'
import UserUtil from '../util/UserUtil'
import MessageUtil from '../util/MessageUtil'
import { userContext } from '../context/UserContext'

function LoginPanel(props) {

    const userManager = useContext(userContext)
    const login = () => {
        UserUtil.login().then((loggedInUser) => {
            // use context obj's callback method to update user 
            userManager.updateUser(loggedInUser)
        }).catch((error) => {
            MessageUtil.messagePopup(error)
        })
    }

    return (
        <Paper variant="outlined">
            <Box px={4} py={4}>
                <Typography variant="body1">
                    {props.title}
                </Typography>
                <Box px={4} py={4}>
                    <Hidden smDown>
                        <GoogleButton type="light" onClick={login} />
                    </Hidden>
                    <Hidden mdUp>
                        <Button variant="contained" color="primary" onClick={login}>Sign In</Button>
                    </Hidden>
                </Box>
            </Box>
        </Paper>
    )
}

export default LoginPanel