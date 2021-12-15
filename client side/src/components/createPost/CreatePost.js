import React , {useState} from 'react'
import { Box, Grid ,TextareaAutosize } from '@material-ui/core'
import { makeStyles , Paper , TextField , Button , CircularProgress  } from '@material-ui/core';
import swal from 'sweetalert'
import FileBase from 'react-file-base64';
import  { createpost } from '../../service_api/Api'

const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : "3%",
    },
    title: {
        fontFamily: 'Oswald, sans-serif',
        fontSize: '35px'
    },
    paper : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '500px',
        paddingBottom: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
    },
    form : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '10px',
        marginRight: '5px',
    },
    input:{
        marginLeft: '20px',
        marginRight: '5px',
        width: '450px',
        marginBottom : '10px'
    },
    signin: {
        color: '#2c3e50',
        textDecoration: 'none',
        marginTop : '20px',
        fontSize : '20px',
    },
     fileInput: {
       width: '97%',
       marginLeft: '20px',
       marginBottom: '50px',
     },
}));

const initval = {
    title: '',
    body: '',
    image : '',
}
const CreatePost = () => {
    const classes = useStyles();
    const [postData , setPostData] = useState(initval)

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name] : e.target.value })
    }

    const submitPost = async () => {
        const user = JSON.parse(localStorage.getItem('profile'))
        if(!user){
            alert("Please Sign in First")
        }

        const { data } = await createpost(postData );

        if(data.status === 200){
            swal({
                icon: "success",
                text: "Post Created successFully!!!"
            });
        }else{
            swal({
                icon: "warning",
                text: data.message
            });
        }
        // setPostData({})
    }


    return (
        <>
            <div className={classes.root}>
                <Paper className={classes.paper} variant = "outlined" elevation = {6} >
                    <h2 className={classes.title}>Create New Post</h2>
                    <form className={classes.form} >
                        <TextField id="outlined-basic" label="Title" name="title" vlaue={postData.title} onChange={(e) => handleChange(e)}  className={classes.input} />
                        <TextareaAutosize
                            minRows={7}
                            aria-label="maximum height"
                            placeholder="Type Detail here..."
                            className={classes.input}
                            value={postData.body}
                            name="body"
                            onChange={(e) => handleChange(e)}
                        />
                        <Box className={classes.fileInput}>
                            <FileBase type="file" multiple={false} className={classes.input}  onDone={({base64}) => setPostData({...postData, image: base64}) }  />
                        </Box>

                        <Box textAlign='center' style={{marginTop: '15px'}}>
                            <Button variant='contained' color="primary" onClick={() => submitPost()}>
                                Create post
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </div>
        </>
    )
}

export default CreatePost
