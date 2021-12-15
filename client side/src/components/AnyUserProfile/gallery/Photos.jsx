import React , {useEffect , useState} from 'react'
import { Box , makeStyles  , CircularProgress } from '@material-ui/core'
import PostCard from './UserPostCard'
import NoPhotos from './NoPhotos'

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    image: {
        height: '200px',
        border: '2px solid white',
        width: '30%',
        marginBottom: '20px'
    },
}));

const Photos = (props) => {
    const classes = useStyles();
    const myPosts = props.myValues;
    const posterId = props.posterId

    return (
        <div>
            <Box className={classes.main}>
            {
                myPosts ?  (
                    Object.values(myPosts).map((data) => {
                        return  <PostCard post={data}  posterId={posterId} />
                    })
                ) : (
                    <NoPhotos/>
                )
            }
            </Box>
        </div>
    )
}

export default Photos
