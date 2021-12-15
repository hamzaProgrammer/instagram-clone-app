import React , {useState} from 'react'
import { Box , makeStyles  } from '@material-ui/core'
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

/* const initVal = {
    body: '',
    createdAt: '',
    image: '',
    title: '',
    _id: ''
} */
const Photos = (props) => {
    const classes = useStyles();
    const myPosts = props.myValues;

    return (
        <div>
            <Box className={classes.main}>
            {
                myPosts && (
                    Object.values(myPosts).map((data) => {
                        return  <PostCard post={data} />
                    })
                )
            }
                {/* {
                    myPosts ?  (
                        myPosts ? (
                            Object.values(myPosts).map((post) => {
                                return(
                                        <>
                                        <h4>{post.name}</h4>
                                        <PostCard post={post} />
                                        </>
                                )
                            })
                        ) : (
                            <CircularProgress size="4rem" style={{marginTop: '80px'}} />
                        )
                    ) : <NoPhotos/>
                } */}
            </Box>
        </div>
    )
}

export default Photos
