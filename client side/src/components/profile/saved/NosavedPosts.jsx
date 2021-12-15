import React from 'react'
import { Grid, Typography , Button , makeStyles , Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import TurnedInIcon from '@material-ui/icons/TurnedIn';

const useStyles = makeStyles((theme) => ({
    igtv : {
        marginLeft : '40%',
        fontFamily: 'Roboto Slab, serif'
    },
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
const NosavedPosts = () => {
    const classes = useStyles();
    return (
        <>
            <Grid container >
                <Grid item lg={6} md={6} sm={6} >
                    <Typography component="h4">No saved posts yet</Typography>
                </Grid>

                <Grid item lg={6} md={6} sm={6}  >
                    <Box className={classes.igtv}>
                        <Button variant="contained"  size="small">
                            <AddIcon/>
                            Create Collection
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Box className={classes.det}>
                    <TurnedInIcon className={classes.iconsave} />
                    <Typography className={classes.head} component="h2">SAVE</Typography>
                    <Typography component="p">Save photos and videos that you want to see again. </Typography>
                </Box>

        </>
    )
}

export default NosavedPosts
