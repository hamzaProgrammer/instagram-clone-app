import React, {useState , useEffect} from 'react';
import { makeStyles , Avatar  } from '@material-ui/core';
import { Card , TextField , Button } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment'
import { addLike  , disLike , addtoSaved , RemoveSavedPost , getSavedArray} from '../../service_api/Api'
import FavoriteIcon from '@material-ui/icons/Favorite';
import swal from 'sweetalert'
import BookmarkIcon from '@material-ui/icons/Bookmark';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    marginBottom: '25px',
    border: '1px solid #dfe6e9'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    marginLeft: 'auto',
  },

  avatar: {
    backgroundColor: red[500],
  },
  icon : {
      fontSize : '30px'
  },
  input : {
      width: '450px',
      marginLeft : '15px'
  },
  likes : {
      color: '#2d3436',
      fontSize : '16px',
      fontWeight: 600,
      marginLeft : '15px'
  },
  btnn : {
      marginLeft : '50px',
      backgroundColor: '#6c5ce7',
      color : '#fff',
      fontWeight: 700
  },

}));

export default function PostCard(props) {
  const classes = useStyles();
  const { _id , body , title , image , postedBy , likes , likesArray } = props.post;
  const { name } = postedBy;
  const postId = postedBy._id;


  const info = JSON.parse(localStorage.getItem('profile'));
  const senderId = info?.result?._id


  const [ myName , setmyName ] = useState('')
  const [ check , setCheck ] = useState(false)
  const [ totLikes , settoLikes ] = useState(likes);
  const [ isLiked , setisLiked ] = useState(false)
  const [ isLoggedLiked , setLoggedLiked ] = useState(false)
  const [isSaved, setisSaved ] = useState(false)

  const checkLikedOrNot = (arr) => {
    if (info){
        const index = arr.findIndex((get_id) => get_id === senderId)

        if (index === -1) {
          setLoggedLiked(false)
          console.log("Not match")
        } else {
          setLoggedLiked(true)
          console.log("Matched")
        }
    }
  }



  const checkSavedOrNot = async () => {
      if (info) {
        try {
          const { data } = await getSavedArray(senderId)

          const arr = data.userData[0].savedArray.slice();

          const index = arr.findIndex((get_id) => get_id === _id)

          if (index === -1) {
            setisSaved(false)
            console.log("Not match in useEffect")
          } else {
            setisSaved(true)
            console.log("Matched  in useEffect")
          }
        } catch (error) {
          console.log(error)
        }
    }
      /*  */
  }

  const getPhoto = async () => {
    setmyName(name.charAt(0))
  }

  // for liking or disliking
  const addLikeMyPost = async (id) => {
    if(localStorage.getItem('profile')){
        if (isLoggedLiked) {
            const { data } = await disLike(id, postedBy._id);
            console.log("Going to dislike", data.updatedPost.likes)

            checkLike(data.updatedPost.likesArray, data.updatedPost.likes);
            setCheck(true)
          }else{
            const { data } = await addLike(id, postedBy._id);
            console.log("Going to Like Liked", data.updatedPost.likes)

            checkLike(data.updatedPost.likesArray , data.updatedPost.likes);
            setCheck(false)
          }
    }else{
      swal({
        icon: "warning",
        text: "Please Login to Complete this action"
      });
    }

  }

  // Array for checkLikke()
  const checkArrayIndex = (totalLikes) => {
        return function (ele) {
          if(ele === postId){
            setisLiked(true)
            settoLikes(totalLikes)
            console.log("If  : ", isLiked, totLikes)
          }else{
            settoLikes(totalLikes)
            setisLiked(false)
          }
        }
  }

  // for deciding to change heart icon or not
  const checkLike = (myArray , totalLikes) => {
    if(localStorage.getItem('profile')){
        if (myArray.length > 0) {
          myArray.forEach(checkArrayIndex(totalLikes))
        }else{
          settoLikes(totalLikes)
          setisLiked(false)
          console.log("Else : ", isLiked, totLikes)
        }
    }




  }


    // for deciding to change heart icon or not
    const savedCheckFunc = (myArray) => {
        if (localStorage.getItem('profile')) {
          if (myArray.length > 0) {
            myArray.forEach(checkArrayIndexSaved)
          } else {
            setisSaved(false)
            console.log("Else : ")
          }
        }
    }


    // Array for checkLikke()
    const checkArrayIndexSaved = () => {
      return function (ele) {
        if (ele === postId) {
          setisSaved(true)
          console.log("If  : ")
        } else {
          setisSaved(false)
        }
      }
    }

  const addtoSavedList = async (postGotId) => {
    if(localStorage.getItem('profile')){
        if (isSaved) {
            const { data } = await RemoveSavedPost(postGotId ,senderId);
            console.log("Going to unsave post")

            savedCheckFunc(data.updatedUser.savedArray);
            setisSaved(false)
          }else{
              try{
                const { data } = await addtoSaved(postGotId ,senderId);
                console.log("Going to save post")

                savedCheckFunc(data.updatedUser.savedArray);
                setisSaved(true)
              }catch(e){
                console.log("Error is ", e)
              }
          }
     }else{
        swal({
          icon: "warning",
          text: "Please Login to Complete this action"
        });
    }
  }


  useEffect(() => {
    getPhoto();
    checkLikedOrNot(likesArray)
    checkSavedOrNot()
  }, [name])

  // for like function
  useEffect(() => {
      checkLike(likesArray, totLikes);
  }, [_id])


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {myName}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={moment(props?.post?.createdAt).fromNow()}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <IconButton aria-label="add to favorites" >
        { isLiked ?  (<FavoriteIcon className={classes.icon} style={{color: 'crimson'}} onClick={() => {   addLikeMyPost(_id) } } />) : (<FavoriteBorderIcon className={classes.icon} onClick={() => {   addLikeMyPost(_id) } } />) }
        </IconButton>

        <IconButton
          className={(classes.expand)}
          aria-label="show more"
        >
        {
          isSaved ? (<BookmarkIcon style={{color: '#3498db'}}  className={classes.icon}  onClick={() => addtoSavedList( _id)}  />) : (<BookmarkBorderIcon  className={classes.icon}  onClick={() => addtoSavedList( _id)} />)
        }
        </IconButton>

      </CardActions>
      <Typography variant="body2" color="textSecondary" component="h5" className={classes.likes} >
        { isLiked ?  (
                 isLoggedLiked  ? (
                                totLikes > 1 ? (
                                  <p>You and {totLikes} Likes</p>
                                ) : (
                                  <p>You Liked this</p>
                                )
                            ) : (
                              <p>{totLikes} Likes </p>
                            )
                ) : (<p>{totLikes} Likes</p>) }
      </Typography>
      </Card>
  )
}
