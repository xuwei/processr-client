import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core'
import { dialogContext } from './context/DialogContext'

function AppDialog(props) {
  const [open, setOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState(null)

  const showDialog = (msg) => {
    setDialogMsg(msg)
  }

  const handleClose = () => {
    setDialogMsg(null);
  }

  useEffect(() => {
    dialogMsg == null ? setOpen(false) : setOpen(true)
  }, [dialogMsg])

  return (
    <dialogContext.Provider value={{updateDialogMsg : setDialogMsg}}>
      {props.children}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
            </Button>
        </DialogActions>
      </Dialog>
    </dialogContext.Provider>
  )
}

export default AppDialog 