import React, { useState, useEffect, useContext } from 'react'
import { Typography, Box, Grid, Container } from '@material-ui/core'
import DialogModel from '../model/DialogModel'
import { userContext } from '../context/UserContext'
import { dialogContext } from '../context/DialogContext'
import UploadPanel from '../common/UploadPanel'
import LoginPanel from '../common/LoginPanel'
import { StandardPadding, ContentWidth } from '../Configs'
import ObjectUtil from '../util/ObjectUtil'
import DateUtil from '../util/DateUtil'
import Papa from 'papaparse'
import { reactLocalStorage } from 'reactjs-localstorage';
import MemberModel from '../model/MemberModel'
import RandomMemberModel from '../model/RandomMemberModel'
import axios from 'axios'

function UploadPage() {

    const userManager = useContext(userContext)
    const dialogManager = useContext(dialogContext)
    const [csvFile, setCsvFile] = useState(null)
    const [xmlFile, setXmlFile] = useState(null)
    const [progress, setProgress] = useState(0) 
    const [processing, setProcessing] = useState(false)
    const [aborting, setAborting] = useState(false)
    const [rowsProcessed, setRowsProcessed] = useState(0)
    var mergedData = [] 
    var counter = 0 
    var err = null
    const BatchSizeToPost = 500
    const Unknown = "unknown"
    var postedBy = Unknown
    const postUrl = () => {
        var postUrl = process.env.SPRINGBOOT !== undefined ? process.env.SPRINGBOOT + "/members" : 'http://localhost:8080/members'
        return postUrl
    }

    function isAborting() {
        return aborting
    }

    const getPostedBy = () => {
        var existingUser = reactLocalStorage.getObject('user');
        if (existingUser.email) {
            return existingUser.email 
        } else {
            return Unknown
        }
    }

    const handleCSVFileSelect = (e) => {
        const csv = e.target.files[0];
        var components = csv.name.split(".")
        if (components.length < 2) { 
            setCsvFile(null)
            setProgress(0) 
        } else if (components[1] === "csv") {
            setCsvFile(csv)
            setProgress(0)
        } else {
            setCsvFile(null)
            setProgress(0) 
        }
    }

    const handleXMLFileSelect = (e) => {
        const xml = e.target.files[0];
        // validate xml here ... 
        setXmlFile(xml)
        setProgress(0)
    }

    const processFailed = (err) => {
        var dialog = new DialogModel("Error", err.toString(), "Ok")
        dialog.callback = ()=> {
            setCsvFile(null)
        }
        dialogManager.updateDialogMsg(dialog)
    }
    
    const processSuccess = () => {
        var dialog = new DialogModel("Message", "Processing completed ! Click download to retrieve JSON file, download might take few seconds to complete.", "Download")
        dialog.callback = ()=> {
            setProgress(0)
            var prefix = ""
            if(mergedData.length >= 0) {
                var elem = mergedData[0]
                if (elem != null && elem["transactionIdentifier"] != null) {
                    prefix = elem["transactionIdentifier"] + "_"
                } else {
                    prefix = csvFile.name + "_"
                }
            }
            ObjectUtil.downloadObjectAsJson(mergedData, prefix + DateUtil.nowReadable())
        }
        dialogManager.updateDialogMsg(dialog)
    }

    const completedProcessing = ()=> {
        setProgress(100)
        setProcessing(false)
        if (err == null) {
            processSuccess()
        } else {
            processFailed(err)
        }
    }

    const abortProcessing = (e) => {
        setAborting(true)
    }

    const postData = (reqBody, reqUrl, successHandler, errHandler)=> {
        axios({
            method: 'post',
            headers: {
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin": true,
                "Access-Control-Allow-Method": "POST"

            }, 
            url: reqUrl,
            data: reqBody
        }).then((res)=> {
            successHandler(res)
        }).catch((error)=> {
            errHandler(error)
        })
    }

    const proceed = (e) => {
        postedBy = getPostedBy()
        counter = 0;
        var dialog = new DialogModel("Message", "Will process files now", "Ok")
        dialog.callback = ()=> {
            setProcessing(true)
            Papa.parse(csvFile, {
                header: true,
                dynamicTyping: false,
                worker: false,
                skipEmptyLines: true,
                fastMode: true, 
                step: (results, parser) => {
                    parser.pause()
                    console.log("aborting inside step: " + isAborting())
                    if(isAborting()) {
                        setAborting(false)
                        parser.abort()
                    } else {
                        var data = results.data
                        const member = new MemberModel(data)
                        // const member = new RandomMemberModel()
                        data["postedBy"] = postedBy 
                        mergedData.push(member)
                        setRowsProcessed(mergedData.length)
                        counter += 1
                        if (counter === BatchSizeToPost) {
                            var arr = mergedData.slice(mergedData.length - BatchSizeToPost, mergedData.length)
                            postData(arr, postUrl(), (res)=>{
                                console.log("posted:")
                                console.log(arr) 
                                counter = 0
                                parser.resume()
                            }, (error)=>{
                                err = error
                                counter = 0 
                                parser.abort()
                            })
                        } else {
                            parser.resume()
                        }
                    }
                },
                error: (error) => {
                    err = error
                    counter = 0
                },
                complete: (results, file) => {
                    var remaining = mergedData.length % BatchSizeToPost
                    if (counter > 0 && remaining > 0) {
                        var arr = mergedData.slice(mergedData.length - remaining, mergedData.length)
                        postData(arr, postUrl(), (res)=>{
                            console.log(res)
                            console.log(mergedData.length)
                            counter = 0
                            completedProcessing()
                        }, (error)=>{
                            err = error
                            counter = 0 
                            completedProcessing()
                        })
                    } else {
                        completedProcessing()
                    }
                }
            })
        }
        dialogManager.updateDialogMsg(dialog)
    }

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
                                    <UploadPanel rowsProcessed={rowsProcessed} processing={processing} proceed={proceed} abortProcessing={abortProcessing} handleCSVFileSelect={handleCSVFileSelect} handleXMLFileSelect={handleXMLFileSelect} csvFile={csvFile} xmlFile={xmlFile} progress={progress} px={StandardPadding.PX} py={StandardPadding.PY} />
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