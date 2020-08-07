import React from 'react'
import { Button, Typography, Box, LinearProgress, Input, Paper } from '@material-ui/core'

function UploadPanel(props) {

    const fileSelect = () => {
        document.getElementById("uploadInput").click();
    }

    return (
        <Box px={props.px} pb={props.pb} pt={props.pt}>
            <Paper variant="outlined">
                <Box px={4} pt={4}>
                    <Typography variant="h5">
                        Upload a new CSV/XML pair
                     </Typography>
                </Box>
                <Box px={4} py={4}>
                    <Box px={4} pb={4}>
                        <LinearProgress variant="determinate" value={props.progress} />
                    </Box>
                    <Input id="uploadInput" hidden type="file" accept="video/*" capture="capture" onChange={props.handleFileSelect} />
                    <Button id="uploadButton" size="large" variant="contained" color="primary" onClick={fileSelect}>
                        Process
                    </Button>
                </Box>
            </Paper>
            
        </Box>
    )
}

export default UploadPanel