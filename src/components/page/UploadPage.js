import React, { useState, useEffect, useContext } from 'react'
import { Typography, Box, Grid, Container } from '@material-ui/core'
import MessageUtil from '../util/MessageUtil'
import { userContext } from '../context/UserContext'
import firebase from '../../Firebase.js';
import { useHistory } from 'react-router-dom';
import UploadPanel from '../common/UploadPanel'
import LoginPanel from '../common/LoginPanel'
import DateUtil from '../util/DateUtil'
import { StandardPadding, ContentWidth } from '../Configs'

function UploadPage() {

    const history = useHistory();
    const userManager = useContext(userContext)
    const [historyList, setHistoryList] = useState([])
    const [csvFile, setCsvFile] = useState(null)
    const [xmlFile, setXmlFile] = useState(null)
    const [progress, setProgress] = useState(0) 

    const handleFileSelect = async (e) => {
        const csv = e.target.files[0];
        const xml = e.target.files[1];
        setCsvFile(csv)
        setXmlFile(xml)
    }

    // handle whenever file is select
    useEffect(()=> {

        const upload = () => {
            // process upload here ... 
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
                                    <UploadPanel handleFileSelect={handleFileSelect} progress={progress} px={StandardPadding.PX} py={StandardPadding.PY} />
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