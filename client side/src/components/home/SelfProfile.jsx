import React from 'react'
import { Box , Grid , makeStyles , Typography , Button }from '@material-ui/core'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    profile: {
        marginTop: '35px',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '40px'
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
const SelfProfile = (props) => {
     const classes = useStyles();
     const { name , email , userPhoto } = props.userInfo;
    const history = useHistory();

     const logoutNow = () => {
        localStorage.clear();
        history.push('/signup')
    }
    return (
        <>
            <Grid container className={classes.profile}>
                <Grid item lg={2} md={2} sm={2}  >
                    <img style={{width:"100%", height:"60px" , borderRadius: '50%'}} src={userPhoto} alt="User Avatar" />
                </Grid>
                <Grid item lg={7} md={7} sm={7}>
                    <Box className={classes.Profilename}>
                    <Typography variant="body2" component="h2" className={classes.email} > {name} </Typography>
                        <Typography variant="body2" component="h2" className={classes.name} > {email} </Typography>
                    </Box>
                </Grid>
                <Grid item lg={3} md={3} sm={3} >
                <Box >
                    <Button size="small" onClick={logoutNow} className={classes.switchBtn}>Switch</Button>
                </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default SelfProfile
