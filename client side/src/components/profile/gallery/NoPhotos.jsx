import { Box, Grid , makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    main : {
        display : 'flex',
    },
    image : {
        width: '120px',
        height: '120px',
        border: '2px solid white'
    },
    right : {
        display : 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Noto Sans JP, sans-serif'
    },
    first : {
        marginTop: '150px',
        fontSize : '17px',
        fontWeight: 700,
    }
}));
const NoPhotos = () => {
    const classes = useStyles();
    return (
        <>
            <Grid container>
                <Grid item lg={6} md={6}>
                    <Box className={classes.main}>
                        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                    </Box>
                    <Box className={classes.main}>
                        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                    </Box>
                    <Box className={classes.main}>
                        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                    </Box>
                </Grid>

                <Grid item  lg={6} md={6} >
                    <Box className={classes.right}>
                        <Typography className={classes.first} component="h2">Start Capturing and Sharing your moments.</Typography>
                        <Typography component="h3">Get the App to share first Photo or Video.</Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default NoPhotos
