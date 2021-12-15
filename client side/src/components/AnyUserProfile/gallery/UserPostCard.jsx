import React , { useEffect, useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { addLike  , disLike} from '../../../service_api/Api'
import swal from 'sweetalert'

const useStyles = makeStyles({
  root: {
    width: '240px',
    marginBottom: '20px'
  },
  media: {
    width: '100%',
    height: '150px',
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
    const {_id ,  body , image , title , likesArray , likes} = props.post;
    const uuid = props.posterId;

    const info = JSON.parse(localStorage.getItem('profile'))
    const SenderId = info?.result?._id
    console.log(SenderId)

     const [totLikes, settoLikes] = useState(likes);
     const [isLiked, setisLiked] = useState(false)
     const [isLoggedLiked, setLoggedLiked] = useState(false)
    const [check, setCheck] = useState(false)

      // for checking if user has liked or not
      const checkLikedOrNot = (arr , likees) => {
            const index = arr.findIndex((get_id) => get_id === SenderId)

            if (index === -1) {
              setisLiked(false)
              setLoggedLiked(false)
              console.log("Not match")
            } else {
              setisLiked(true)
              setLoggedLiked(true)
              console.log("Matched")
            }
            settoLikes(likees)
      }


      // for liking or disliking
  const addLikeMyPost = async (id) => {
    if(localStorage.getItem('profile')){
        if (isLoggedLiked) {
            const { data } = await disLike(id, SenderId);
            console.log("Going to disliked")

            checkLikedOrNot(data.updatedPost.likesArray, data.updatedPost.likes);
          }else{
            const { data } = await addLike(id, SenderId);
            console.log("Going to like", data.updatedPost.likes)

            checkLikedOrNot(data.updatedPost.likesArray , data.updatedPost.likes);
          }
    }else{
      swal({
        icon: "warning",
        text: "Please Login to Complete this action"
      });
    }

  }


      useEffect(()=> {
        checkLikedOrNot(likesArray, likes)
      }, [_id])

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          { isLiked ?  (<FavoriteIcon className={classes.icon} style={{color: 'crimson'}}  onClick={() => {   addLikeMyPost(_id) } } />) : (<FavoriteBorderIcon className={classes.icon}  onClick={() => {   addLikeMyPost(_id) } }  />) }
        </Button>
        <Button size="small" color="primary">
          <DeleteIcon/>
        </Button>
      </CardActions>  {console.log("is liked or not", isLiked)}

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
    </Card>
  );
}
