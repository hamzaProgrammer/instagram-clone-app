import React , {useEffect ,useState} from 'react'
import { Box, Typography ,makeStyles , Grid , Button , CircularProgress } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import Tabs from './Tabs'
import { getUserProfile , getMyTotalPosts , addFollower , UnFollower} from '../../service_api/Api'
import { useParams } from 'react-router-dom'



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
    const { id } = useParams();

    const [ check, setCheck ] = useState(true);
    const [ myPosts, setmyPosts ] = useState({})
    const [ CountPost , setCountPost ] = useState(0)
    const [ CountFollowers, setCountFollowers ] = useState(0)
    const [ CountFollowing, setCountFollowing ] = useState(0)
    const [ gotRes , setgotRes ] = useState(false)
    const [ newCheck , setNewCheck] = useState(true)
    const [ checkBtn , setCheckBtn ] = useState(false)
    const [ ctrntUserId , setCurntUserid ] = useState("")

    var followArr = [];

    // getting info for profile
    const getInfo =  async () => {
        const { data } = await getUserProfile(id)

        followArr = data.allPosts.followersArray.slice();
        checkFollower(followArr);

        getCountPosts(id);// for getting posts count

        setCountFollowers(data.allPosts.followers)
        setCountFollowing(data.allPosts.following)


        setmyPosts(data.allPosts);
        setCheck(false)
        setgotRes(true)
    }

    const checkFollower = (arr) => {
        if(localStorage.getItem('profile')){
            const index = arr.findIndex((get_id) => get_id === id)

            if (index === -1) {
                setNewCheck(true)
                setCheckBtn(false)
            } else {
                setNewCheck(true)
                setCheckBtn(true)
            }
        }
    }

    // for getting posts count
    const getCountPosts = async () => {
        const { data } = await getMyTotalPosts(id)
        setCountPost(data.postCount)
    }



    // for follow or unfollow
    const FollowNow = async () => {
        var userMyId ;
            if(localStorage.getItem('profile')){
               const info = JSON.parse(localStorage.getItem('profile'));
                userMyId = info.result._id;
                console.log("Inside of if ", userMyId)

                if (newCheck) {
                const { data } = await addFollower(id ,userMyId );
                console.log("in If and data : ", data)
                setCountFollowers(data.updatedUser.followers)
                setCountFollowing(data.updatedsender.following)

                setNewCheck(false)
                setCheckBtn(true)
                } else{
                    const { data } = await UnFollower(id, userMyId);
                    console.log("in else and data : ", data)
                    setCountFollowers(data.updateduser.followers)
                    setCountFollowing(data.updateduser.following)

                    setNewCheck(true)
                    setCheckBtn(false)
                }
            }else{
                alert("Please Sign In First to perform this operation")
        }
    }


    useEffect(()=> {
      check && (
        getInfo()
      )
    }, [id])

    useEffect(() => {
        setCurntUserid()
    }, [ctrntUserId, setCurntUserid])

    return (
        <>
            {
                gotRes ? (
                    <>
                        <Box className={classes.mainRoot}>
                <Grid container className={classes.root} >
                    <Grid item lg={3} md={3} >
                        <img className={classes.image}
                            src={myPosts.userPhoto}
                            alt="Profile"
                        />
                    </Grid>

                    <Grid item className={classes.right} lg={9} md={9}>
                        <Box className={classes.sett}>
                            <Typography className={classes.email}>{myPosts.email}</Typography>
                            {
                                checkBtn ? (
                                    <Button variant="contained"  style={{backgroundColor: '#0652DD' , color: '#fff' , fontWeight: 700}}  onClick={() => FollowNow( )} > Following </Button>
                                ) : (
                                    <Button variant="contained"  color="secondary" style={{ color: '#fff' , fontWeight: 700}} onClick={() => FollowNow( )} > Follow </Button>
                                )
                            }

                            <Button variant="outlined"> Edit Profile</Button>
                            <SettingsIcon className={classes.settIcon} />
                        </Box>

                        <Box className={classes.folowersSec}>
                            <Typography className={classes.followsers} >{CountPost} <span className={classes.span}>posts</span> </Typography>
                            <Typography className={classes.followsers}  >{CountFollowers} <span className={classes.span}>followers</span></Typography>
                            <Typography  className={classes.followsers} >{CountFollowing} <span className={classes.span}>following</span></Typography>
                        </Box>

                        <Typography className={classes.title}> {myPosts.name} </Typography>
                    </Grid>
                </Grid>
            </Box>

            <div className={classes.tabshere}>
                <Tabs userData={myPosts}  />
            </div>
                    </>
                ) : (
                    <CircularProgress size="8rem"  style={{marginLeft: '600px' , marginTop: '200px'}} />
                )
            }

        </>
    )
}

export default Profile
