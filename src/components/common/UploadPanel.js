import React from 'react'
import { Button, Typography, Box, LinearProgress, Input, Paper } from '@material-ui/core'
import ObjectUtil from '../util/ObjectUtil'

function UploadPanel(props) {

    const selectCSV = ()=> {
        document.getElementById("csvSelect").click()
    }

    const selectXML = ()=> {
        document.getElementById("xmlSelect").click()
    }

    return (
        <Box px={props.px} pb={props.pb} pt={props.pt}>
            <Paper variant="outlined">
                <Box px={4} pt={4}>
                    <Typography variant="h5">
                        Upload a new CSV/XML dataset
                     </Typography>
                </Box>
                <Box px={4} py={4}>
                    <Box hidden={!props.processing} px={4} pb={4}>
                        <Typography variant="subtitle1">rows processed: {props.rowsProcessed}</Typography>
                        <LinearProgress color="primary"/>
                    </Box>
                    <Box px={4} pb={4}>
                        <Box visibility="hidden">
                            <Input id="csvSelect" type="file" accept="text/csv, .csv" capture="capture" onChange={props.handleCSVFileSelect} />
                        </Box>
                        { props.csvFile ? 
                        <Typography variant="subtitle1">{props.csvFile.name},{ObjectUtil.bytesToSize(props.csvFile.size)}</Typography>
                        :
                        <Typography variant="subtitle1"></Typography>
                        }
                        <Button disabled={props.processing} size="large" variant="outlined" color="primary" onClick={selectCSV}>
                            Select CSV
                        </Button>
                    </Box>
                    <Box px={4} pb={4}>
                        <Box visibility="hidden">
                            <Input id="xmlSelect" type="file" accept=".xml" capture="capture" onChange={props.handleXMLFileSelect} />
                        </Box>
                        { props.xmlFile ? 
                        <Typography variant="subtitle1">{props.xmlFile.name}, {props.xmlFile.size} bytes</Typography>
                        :
                        <Typography variant="subtitle1"></Typography>
                        }
                        <Button disabled size="large" variant="outlined" color="primary" onClick={selectXML}>
                            Select XML
                        </Button>
                    </Box>
                    <br/>
                    <Button disabled={props.processing || props.csvFile == null} id="proceed" size="large" variant="contained" color="primary" onClick={props.proceed}>
                        Proceed
                    </Button>
                    <br/><br/>
                    <Typography hidden={!props.processing} variant="caption">Close tab to abort current process</Typography>
                </Box>
            </Paper>
        </Box>
    )
}

export default UploadPanel