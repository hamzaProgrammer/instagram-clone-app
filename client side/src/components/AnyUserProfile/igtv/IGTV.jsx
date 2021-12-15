import { Grid, Typography , Button , makeStyles , Box } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    igtv : {
        marginLeft : '60%'
    }
}))
const IGTV = () => {
    const classes = useStyles();
    return (
        <>
            <Grid container >
                <Grid item lg={6} md={6} sm={6} >
                    <Typography component="h4">No Videos</Typography>
                </Grid>

                <Grid item lg={6} md={6} sm={6}  >
                <Box className={classes.igtv}>
                    <Button variant="contained" color="primary" size="small">Upload Now</Button>
                </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default IGTV
