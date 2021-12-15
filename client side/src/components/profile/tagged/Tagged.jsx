import React from 'react'
import { Typography  , makeStyles , Box } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    det: {
        marginLeft: '10%',
        marginTop : '10%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Roboto Slab, serif'
    },
    iconsave : {
        fontSize : '50px',
        padding: '10px',
        border: '2px solid black',
        borderRadius: '50%'
    },
    head: {
        marginTop : '20px',
        fontWeight: 600,
        fontSize : '22px',
        marginBottom : '20px',
    }
}))
const Tagged = () => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.det}>
                <AccountCircleIcon className={classes.iconsave} />
                <Typography className={classes.head} component="h2">Photos of You</Typography>
                <Typography Typography component = "p" > When people tag you in photos, they 'll appear here. </Typography>
            </Box>
        </>
    )
}

export default Tagged
