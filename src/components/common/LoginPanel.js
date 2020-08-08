
import React, { useContext } from 'react'
import { Hidden, Paper, Box, Typography, Button } from '@material-ui/core'
import GoogleButton from 'react-google-button'
import UserUtil from '../util/UserUtil'
import { userContext } from '../context/UserContext'
import { dialogContext } from '../context/DialogContext'
import DialogModel from '../model/DialogModel'

function LoginPanel(props) {

    const userManager = useContext(userContext)
    const dialogManager = useContext(dialogContext)

    const login = () => {
        UserUtil.login().then((loggedInUser) => {
            // use context obj's callback method to update user 
            userManager.updateUser(loggedInUser)
        }).catch((error) => {
            const dialog = new DialogModel("Message", error, "Ok")
            dialogManager.updateDialogMsg(dialog)
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