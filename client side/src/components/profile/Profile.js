import React from 'react'
import { Box, Typography ,makeStyles , Grid , Button } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import Tabs from './Tabs'

const useStyles = makeStyles((theme) => ({
    mainRoot : {
        maxWidth: '800px',
        marginLeft : '17%',
        borderBottom : '1px solid silver'
    },
    root: {
        display: "flex",
        justifyContent: "center",
        margin: '28px 0px',
    },
    image: {
        width: "160px",
        height:"160px",
        borderRadius:"80px"
    },
    email : {
        fontSize:'18px',
        fontWeight: 600,
        color: '#4b4b4b'
    },
    title : {
        marginTop : '25px',
        fontWeight: 700,
        fontSize: '20px',
        color: '#2f3640'
    },
    folowersSec : {
        display: 'flex',
        marginTop : '20px'
    },
    right : {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '30px'
    },
    followsers: {
        marginRight: '40px',
        fontSize : '16px',
        fontWeight: 600,
        color: '#34495e'
    },
    span : {
        color: '#2c3e50',
        fontWeight: 500
    },
    sett : {
        display: 'flex',
        justifyContent: 'space-between'
    },
    settIcon : {
        fontSize: '30px'
    },
    tabshere : {
        maxWidth: '800px',
        marginLeft: '17%',
        marginTop : '5px'
    }
}))
const Profile = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <>
            <Box className={classes.mainRoot}>
                <Grid container className={classes.root} >
                    <Grid item lg={3} md={3} >
                        <img className={classes.image}
                            src={user.result.userPhoto}
                            alt="Profile"
                        />
                    </Grid>

                    <Grid item className={classes.right} lg={9} md={9}>
                        <Box className={classes.sett}>
                            <Typography className={classes.email}>{user.result.email}</Typography>
                            <Button variant="outlined"> Edit Profile</Button>
                            <SettingsIcon className={classes.settIcon} />
                        </Box>

                        <Box className={classes.folowersSec}>
                            <Typography className={classes.followsers} >40  <span className={classes.span}>posts</span> </Typography>
                            <Typography className={classes.followsers}  >40 <span className={classes.span}>followers</span></Typography>
                            <Typography  className={classes.followsers} >40 <span className={classes.span}>following</span></Typography>
                        </Box>

                        <Typography className={classes.title}> {user.result.name} </Typography>
                    </Grid>
                </Grid>
            </Box>

            <div className={classes.tabshere}>
                <Tabs userData={user.result}  />
            </div>
        </>
    )
}

export default Profile
