import React, { useState, useEffect, useContext } from 'react'
import { Typography, Box, Grid, Container } from '@material-ui/core'
import DialogModel from '../model/DialogModel'
import { userContext } from '../context/UserContext'
import { dialogContext } from '../context/DialogContext'
import { useHistory } from 'react-router-dom';
import UploadPanel from '../common/UploadPanel'
import LoginPanel from '../common/LoginPanel'
import { StandardPadding, ContentWidth } from '../Configs'

function UploadPage() {

    const history = useHistory();
    const userManager = useContext(userContext)
    const dialogManager = useContext(dialogContext)
    const [historyList, setHistoryList] = useState([])
    const [csvFile, setCsvFile] = useState(null)
    const [xmlFile, setXmlFile] = useState(null)
    const [progress, setProgress] = useState(0) 

    const handleCSVFileSelect = (e) => {
        const csv = e.target.files[0];
        debugger;
        setCsvFile(csv)
    }

    const handleXMLFileSelect = (e) => {
        const xml = e.target.files[0];
        debugger;
        setXmlFile(xml)
    }
    
    const proceed = (e) => {
        const dialog = new DialogModel("Message", "Will process files now", "Ok")
        dialogManager.updateDialogMsg(dialog)
    }

    // handle whenever file is select
    useEffect(()=> {

        const upload = () => {
            // process upload here ... 
            console.log(csvFile)
            console.log(xmlFile)
            debugger;
        }

        if (csvFile == null || xmlFile == null) return 
        upload() 
    }, [csvFile, xmlFile, userManager, history])

    // user's upload history 
    useEffect(() => {
        if (userManager.user == null) return
    }, [userManager])

    return (
        <Container>
            <Box flexGrow={1} align="center" py={StandardPadding.PY}>
                <Grid item sm={ContentWidth.SM} md={ContentWidth.MD}>
                    <Typography variant="h2" color="primary">
                        Big Data Processr
                    </Typography>
                    <Box px={StandardPadding.PX} py={StandardPadding.PY}>
                        <userContext.Consumer>
                            {(userManager) => (
                                userManager.user ?
                                <Box>
                                    <UploadPanel proceed={proceed} handleCSVFileSelect={handleCSVFileSelect} handleXMLFileSelect={handleXMLFileSelect} progress={progress} px={StandardPadding.PX} py={StandardPadding.PY} />
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