import React from 'react'
import { Box , makeStyles } from '@material-ui/core'

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
const Photos = () => {
    const classes = useStyles();
    return (
        <div>
            <Box className={classes.main}>
                <img src="https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                <img src="https://images.unsplash.com/photo-1630524233940-8fda17e3d190?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                <img src="https://images.unsplash.com/photo-1630523628239-576bc71b6f69?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                <img src="https://images.unsplash.com/photo-1630524233940-8fda17e3d190?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                <img src="https://images.unsplash.com/photo-1630523628239-576bc71b6f69?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                <img src="https://images.unsplash.com/photo-1630524233940-8fda17e3d190?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
                <img src="https://images.unsplash.com/photo-1630523628239-576bc71b6f69?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Google Images" className={classes.image} />
            </Box>
        </div>
    )
}

export default Photos
