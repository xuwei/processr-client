import React, { useState, useEffect, useContext } from 'react'
import { Typography, Box, Grid, Container } from '@material-ui/core'
import DialogModel from '../model/DialogModel'
import { userContext } from '../context/UserContext'
import { dialogContext } from '../context/DialogContext'
import UploadPanel from '../common/UploadPanel'
import LoginPanel from '../common/LoginPanel'
import { StandardPadding, ContentWidth } from '../Configs'
import CSVReader from 'react-csv-reader'

function UploadPage() {

    const userManager = useContext(userContext)
    const dialogManager = useContext(dialogContext)
    const [csvFile, setCsvFile] = useState(null)
    const [xmlFile, setXmlFile] = useState(null)
    const [mergedData, setMergedData] = useState([])
    const [progress, setProgress] = useState(0) 

    const csvParseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
    }

    const handleCSVFileSelect = (data, fileInfo) => {

        var mergedData = [] 
        //validate csv here ... 
        for (var i = 1; i < data.length; i++) {
            mergedData.push(data[i])
        }
        setMergedData(mergedData)
        setCsvFile(fileInfo)
    }

    const handleXMLFileSelect = (e) => {
        const xml = e.target.files[0];
        // validate xml here ... 
        setXmlFile(xml)
    }
    
    const proceed = (e) => {
        var dialog = new DialogModel("Message", "Will process files now", "Ok")
        dialog.callback = ()=> {
            
            for (var i = 0; i < mergedData.length; i++) {
                console.log(mergedData[i])
            }
        }
        dialogManager.updateDialogMsg(dialog)
    }

    // handle whenever file is select
    useEffect(()=> {
        console.log(csvFile)
        console.log(xmlFile)
    }, [csvFile, xmlFile])

    // user's upload history 
    useEffect(() => {
        if (userManager.user == null) return
    }, [userManager])

    return (
        <Container>
            <Box flexGrow={1} align="center" py={StandardPadding.PY}>
                <Grid item sm={ContentWidth.SM} md={ContentWidth.MD}>
                    <Typography variant="h2" color="primary">
                        Data Processr
                    </Typography>
                    <Box px={StandardPadding.PX} py={StandardPadding.PY}>
                        <userContext.Consumer>
                            {(userManager) => (
                                userManager.user ?
                                <Box>
                                    <UploadPanel proceed={proceed} handleCSVFileSelect={handleCSVFileSelect} handleXMLFileSelect={handleXMLFileSelect} csvParseOptions={csvParseOptions} csvFile={csvFile} xmlFile={xmlFile} progress={progress} px={StandardPadding.PX} py={StandardPadding.PY} />
                                </Box>
                                :
                                <Box>
                                    <LoginPanel title={"Please sign in to proceed"} />
                                </Box>
                            )}
                        </userContext.Consumer>
                    </Box>
                </Grid>
            </Box>
        </Container>
    )
}

export default UploadPage