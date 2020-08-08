import React from 'react'
import { Button, Typography, Box, LinearProgress, Input, Paper } from '@material-ui/core'

function UploadPanel(props) {

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
                    <Box px={4} pb={4}>
                        <Input id="csvSelect" type="file" accept=".csv" capture="capture" onChange={props.handleCSVFileSelect} />
                    </Box>
                    <Box px={4} pb={4}>
                        <Input id="xmlSelect" type="file" accept=".xml" capture="capture" onChange={props.handleXMLFileSelect} />
                    </Box>
                    <br/>
                    <Button id="uploadButton2" size="large" variant="contained" color="primary" onClick={props.proceed}>
                        Proceed
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default UploadPanel