import React, { useState, useEffect } from "react";
import UserUtil from './util/UserUtil'
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
            alert(error)
        })
    }, [])

    return(
        <userContext.Provider value={{user : user, updateUser : update}}>
            {props.children}
        </userContext.Provider>
    )
    
}

export default Auth