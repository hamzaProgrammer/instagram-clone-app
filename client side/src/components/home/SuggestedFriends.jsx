import React  from 'react'
import { Box , Grid, makeStyles, Typography , Button }from '@material-ui/core'
import {Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    suggestions: {
        marginTop: '20px',
        display: 'flex',
        marginBottom: '20px'
    },
    first: {
        fontWeight: 700
    },
     profile: {
        marginTop: '5px',
        display: 'flex',
        flexDirection: 'row',
    },
    Profilename: {
        paddingTop: '10px',
        marginLeft: '15px'
    },
    email: {
        color: '#b2bec3'
    },
    switchBtn: {
        marginTop: '15px',
        fontWeight: 700,
        color: '#00a8ff'
    }
}))
const SuggestedFriends = () => {
    const classes = useStyles();


    return (
        <>
            {/* <Grid container className={classes.suggestions}>
                <Grid item lg={10} md={10} sm={10}>
                    <Typography className={classes.first} variant="body2" component="h5">Suggested For You</Typography>
                </Grid>
                <Grid item lg={2} md={2} sm={2}>
                    <Typography variant="body2" component="h5">See All</Typography>
                </Grid>
            </Grid> */}
            {/* All Suggested Friends */}

            {
                {/* AllgotUsers &&  (
                    AllgotUsers.map((data) => {
                        return (
                            <>
                                
                            </>
                        )
                    })
                ) */}
            }
        </>
    )
}

export default SuggestedFriends
