import React, { useState, useEffect, useContext } from "react";
import UserUtil from './util/UserUtil'
import { userContext } from './context/UserContext'
import { dialogContext } from './context/DialogContext'
import DialogModel from './model/DialogModel'

function Auth(props) {

    const [user, setUser] = useState(null)
    const dialogManager = useContext(dialogContext)

    const update = (loggedInUser) => {
        setUser(loggedInUser)
    }
   
    useEffect(()=> {
        UserUtil.fetchUser().then((loggedInUser) => {
            setUser(loggedInUser)
        }).catch((error)=> {
            const dialog = new DialogModel("Message", error, "Ok")
            dialogManager.updateDialogMsg(dialog)
        })
    }, [])

    return(
        <userContext.Provider value={{user : user, updateUser : update}}>
            {props.children}
        </userContext.Provider>
    )
    
}

export default Auth