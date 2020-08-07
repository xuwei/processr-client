// will implement this to trigger popup message box later 
// to handle error scenarios generically 
const messagePopup = (error)=> {
    if (error == null) return 
    console.log(error)
}

const messagePopupSucccess = (msg) => {
    console.log(msg)
    return
}

export default { messagePopup, messagePopupSucccess }