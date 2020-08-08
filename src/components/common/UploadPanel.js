import React from 'react'
import CSVReader from 'react-csv-reader'
import { Button, Typography, Box, LinearProgress, Input, Paper } from '@material-ui/core'

function UploadPanel(props) {

    const selectCSV = ()=> {
        document.getElementById("react-csv-reader-input").click()
    }

    const selectXML = ()=> {
        document.getElementById("xmlSelect").click()
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
                    <Box px={4} pb={4}>
                        <Box visibility="hidden">
                        <CSVReader id="csvUpload" cssClass="react-csv-input"
                                onFileLoaded={props.handleCSVFileSelect} parserOptions={props.csvParseOptions}/>
                        </Box>
                        { props.csvFile ? 
                        <Typography variant="subtitle1">{props.csvFile.name},{props.csvFile.size} bytes</Typography>
                        :
                        <Typography variant="subtitle1"></Typography>
                        }
                        <Button size="large" variant="outlined" color="primary" onClick={selectCSV}>
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
                        <Button size="large" variant="outlined" color="primary" onClick={selectXML}>
                            Select XML
                        </Button>
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