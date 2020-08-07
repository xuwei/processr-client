import React, { useState, useEffect } from "react";
import UserUtil from './util/UserUtil'
import MessageUtil from './util/MessageUtil'
import { userContext } from './context/UserContext'

function Auth(props) {

    const [user, setUser] = useState(null)

    const update = (loggedInUser) => {
        setUser(loggedInUser)
    }
   
    useEffect(()=> {
        UserUtil.fetchUser().then((loggedInUser) => {
            setUser(loggedInUser)
        }).catch((error)=> {
            MessageUtil.messagePopup(error)
        })
    }, [])

    return(
        <userContext.Provider value={{user : user, updateUser : update}}>
            {props.children}
        </userContext.Provider>
    )
    
}

export default Auth