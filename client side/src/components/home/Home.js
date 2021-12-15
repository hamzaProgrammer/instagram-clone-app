import React , {useState  , useEffect} from 'react'
import { Box , Grid, makeStyles  ,  CircularProgress , Typography , Button  }from '@material-ui/core'
import PostCard from './PostCard'
import SelfProfile from './SelfProfile'
import { getAllPosts , getAllUsers , getAllUsersExpOne , addFollower , UnFollower , getUserProfile} from '../../service_api/Api'
import { useLocation, Link  } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    mainDiv : {
        marginTop : '25px',
        maxWidth : '70%',
        marginLeft : '15%',
    },

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
            color: '#2f3542',
            fontWeight: 700,
        },
        switchBtn: {
            marginTop: '15px',
            fontWeight: 700,
            color: '#00a8ff'
        }
}))

const Home = () => {
    const classes = useStyles();
    const [ AllPosts , setAllPosts ] = useState([]);
    const location = useLocation()

    const userInfo = JSON.parse(localStorage.getItem('profile'));

    const [check, setCheck] = useState(true)
    const [AllgotUsers, setAllgotUsers ] = useState({});
    const [newCheck, setNewCheck] = useState(true)
    const [checkBtn, setCheckBtn] = useState(false)

    // for suggested firnds
    const getUsers = async () => {

        if(userInfo){ // if user is logged in the  his profile will not be shown in suggested
            const { data } = await  getAllUsersExpOne(userInfo.result._id)

            setAllgotUsers(data.users)
        }else{ // if not logged in , then show all users including him
            const { data } = await getAllUsers();

            setAllgotUsers(data.users)
        }

        setCheck(false)
    }

    // getting all posts
    const getAll = async () => {
        const { data } = await getAllPosts();

        if(data.Posts.length > 0 ){
            setAllPosts(data.Posts)
        }
    }


    // for checking wether currenr  user folows or not already
    var followArr = []
     const getInfo =  async (sugestedId) => {
        if (userInfo) {
            const loggedUserId = userInfo.result._id;
            const { data } = await getUserProfile(sugestedId)

            followArr = data.allPosts.followersArray.slice();
            const index = followArr.findIndex((get_id) => get_id === loggedUserId)

            if (index === -1) {
                setNewCheck(true)
                setCheckBtn(false)
            } else {
                setNewCheck(true)
                setCheckBtn(true)
            }
        }

     }

    // for follow or unfollow
    const FollowNow = async (id) => {
        var userMyId ;
            if(localStorage.getItem('profile')){
               const info = JSON.parse(localStorage.getItem('profile'));
                userMyId = info.result._id;
                console.log("Inside of if ", userMyId)

                if (newCheck) {
                const { data } = await addFollower(id ,userMyId );
                console.log("in If and data : ", data)

                setNewCheck(false)
                setCheckBtn(true)
                } else{
                    const { data } = await UnFollower(id, userMyId);
                    console.log("in else and data : ", data)

                    setNewCheck(true)
                    setCheckBtn(false)
                }
            }else{
                alert("Please Sign In First to perform this operation")
        }
    }



    useEffect(() => {
        getAll();
    }, [location])

    // for suggested firnds
    useEffect(() => {
        check && (
            getUsers()
        )
    }, [ getUsers])


    return (
        <>
            <Box className={classes.mainDiv}>
                <Grid container>
                    <Grid item lg={8} md={8} sm={8} >
                        {
                            AllPosts.length > 0 ? (
                                AllPosts.map((data) =>{
                                    return <PostCard key={data._id} post={data}  />
                                })
                            ) : (
                                <CircularProgress size="4rem"  style={{marginLeft: '220px' , marginTop: '250px'}} />
                            )
                        }
                    </Grid>

                    <Grid  item lg={4} md={4} sm={4} style={{paddingLeft: '25px', }} >
                        {
                            userInfo && (
                                <SelfProfile userInfo={userInfo.result}  />
                            )
                        }

                        {/* Suggested  Friends  here */}
                            <Grid container className={classes.suggestions}>
                                <Grid item lg={10} md={10} sm={10}>
                                    <Typography className={classes.first} variant="body2" component="h5">Suggested For You</Typography>
                                </Grid>
                                <Grid item lg={2} md={2} sm={2}>
                                    <Typography variant="body2" component="h5">See All</Typography>
                                </Grid>
                            </Grid>
                        {
                            Object.values(AllgotUsers).map((data) => {
                                    getInfo(data._id)
                                return (
                                    <>
                                        <Grid container className={classes.profile}>
                                    <Grid item lg={2} md={2} sm={2}  >
                                        <Link  to = {`/newProfile/${data._id}`} >
                                            <img style={{width:"100%", height:"60px" , borderRadius: '50%'}} src={data.userPhoto} alt="User Avatar" />
                                        </Link>
                                    </Grid>
                                    <Grid item lg={7} md={7} sm={7}>
                                        <Box className={classes.Profilename}>
                                         <Link  to = {`/newProfile/${data._id}`} >
                                            <Typography variant="body2" component="h2" className={classes.email} style={{textDecoration: 'none'}}  >{data.name}</Typography>
                                        </Link>
                                            <Typography variant="body2" component="h2" className={classes.name} >New to Intsagram</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={3} >
                                    
                                    <Box >
                                        {
                                            checkBtn ? (
                                                <Button variant="contained"  style={{backgroundColor: '#0652DD' , color: '#fff' , fontWeight: 700}}  onClick={() => FollowNow(data._id )} > Following </Button>
                                            ) : (
                                                <Button variant="contained"  color="secondary" style={{ color: '#fff' , fontWeight: 700}} onClick={() => FollowNow( data._id)} > Follow </Button>
                                            )
                                        }
                                    </Box>
                                    </Grid>
                                </Grid>
                                    </>
                                )
                            })
                        }
                    </Grid>
                    {/* Suggested  Friends Ends here */}
                </Grid>
            </Box>
        </>
    )
}

export default Home