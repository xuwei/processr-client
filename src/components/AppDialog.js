import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core'
import { dialogContext } from './context/DialogContext'
import ObjectUtil from './util/ObjectUtil'

function AppDialog(props) {
  const [open, setOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState(null)

  const showDialog = (model) => {
    setDialogMsg(model)
  }

  const close = ()=> {
    setOpen(false)
  }

  useEffect(()=> {
    if (open === false) {
      if (dialogMsg != null && ObjectUtil.isFunction(dialogMsg.callback))  {
        dialogMsg.callback()
      }
    }
  }, [open])

  useEffect(() => {
    const model = dialogMsg
    if (model != null && model.title != null && model.message != null && model.confirm != null) {
      setOpen(true)
    }
  }, [dialogMsg])

  if (dialogMsg === null) {
    return(
      <dialogContext.Provider value={{updateDialogMsg : showDialog}}>
        {props.children}
      </dialogContext.Provider>
    )
  }
  return (
    <dialogContext.Provider value={{updateDialogMsg : showDialog}}>
      {props.children}
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogMsg.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMsg.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={close}>
            {dialogMsg.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </dialogContext.Provider>
  )
}

export default AppDialog 