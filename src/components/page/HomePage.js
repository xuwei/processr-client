import React from 'react'
import { Typography, Box, Grid, Container, Button } from '@material-ui/core'
import { StaticRoutes, ContentWidth, LargePadding } from '../Configs'

function HomePage() {
    return (
        <Container>
            <Box flexGrow={1} align="center" py={LargePadding.PY}>
                <Grid item xs={ContentWidth.SM} md={ContentWidth.MD}>
                    <Typography variant="h2" color="primary" mx="auto" >
                        Processr - Data Processing Demo
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary" mx="auto">
                        This is system design demo to show processing data file with minimal server resources<br />
                    </Typography>
                    <Box py={LargePadding.PY}>
                        <Button size="large" href={StaticRoutes.UPLOAD} variant="contained" color="primary" my={4}>Get started</Button>
                    </Box>
                </Grid>
            </Box>
        </Container>
    )
}

export default HomePage