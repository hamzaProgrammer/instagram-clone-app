import React , {useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link , useLocation , useHistory} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Grand Hotel , cursive',
    fontSize: '35px',
    textDecoration: 'none',
    color: '#fff'
  },
  menuBtn : {
    fontWeight: 700,
    textTransform: 'none',
    fontSize: '15px',
    marginRight: '10px'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const location = useLocation(); // for getting current URL
  const [fig , setFig] = useState('')
  const history = useHistory();

    const userId = JSON.parse(localStorage.getItem('profile'));
    var sendId;
    if(userId){
      sendId = userId.result._id
    }else{
      console.log("User Not Logged In yet")
    }

  const logoutNow = () => {
    localStorage.clear();
    setFig('cleared')
    history.push('/')
  }

  useEffect(() => {
    setFig("Hamza")
  }, [fig , location])


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} component={Link} to="/">
            Instagram
          </Typography>
          {
            localStorage.getItem('profile') ? (
                <>
                  <Button component={Link} to={`/newProfile/${sendId}`} size="small" color="inherit" variant="outlined" className={classes.menuBtn} > Profile</Button>
                  <Button component={Link} to="/createPost" size="small" color="inherit" variant="outlined" className={classes.menuBtn}>Create Post</Button>
                  <Button onClick={logoutNow} color="inherit" size="small" variant="outlined" className={classes.menuBtn}>Logout</Button>
                </>
            ) : (
              <>
                <Button component={Link} to="/signin" color="inherit" size="small" variant="outlined" className={classes.menuBtn}>SignIn</Button>
                <Button component={Link} to="/signup" color="inherit" size="small" variant="outlined" className={classes.menuBtn}>SignUp</Button>
              </>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

