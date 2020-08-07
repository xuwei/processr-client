import React from 'react'
import { Typography, Box, Grid } from '@material-ui/core'
import { StandardPadding, ContentWidth } from '../Configs' 

function NotFoundPage(props) {

    return (
        <Box flexGrow={1} align="center" py={StandardPadding.PY}>
            <Grid item sm={ContentWidth.SM} md={ContentWidth.MD}>
                <Typography variant="h2" color="primary" mx="auto" >
                    { props.message ?  props.message : "Sorry, page not found" }
                    </Typography>
            </Grid>
        </Box>
    )
}

export default NotFoundPage