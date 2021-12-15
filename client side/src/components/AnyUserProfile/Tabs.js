import React , {useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles , CircularProgress } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NoPhotos from './gallery/NoPhotos'
import Photos from './gallery/Photos'
import IGTV from './igtv/IGTV'
import Saved from './saved/SavedPosts';
import NoSavedPosts from './saved/NosavedPosts'
import Tags from './tagged/Tagged'
import { getMyPosts } from '../../service_api/Api'
import {useLocation} from 'react-router-dom'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
 
    boxShadow: 'none'
  },
}));

export default function SimpleTabs(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const { userData } = props;
    const posterId = userData._id;

    const [ check , setCheck ] = useState(true);
    const [myPosts, setmyPosts] = useState({})
    const [gotRes, setgotRes] = useState(false)

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const getPosts =  async () => {
        const { data } = await getMyPosts(userData._id);

        setmyPosts(data.allPosts)
        setCheck(false)
        setgotRes(true)
    }

    useEffect(()=> {
      check && (
        getPosts()
      )
    }, [getPosts])

    return (
      < >
      {
        gotRes ? (
          <>
              <AppBar className={classes.root} position="static" color="default">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="PHOTOS" {...a11yProps(0)} />
                  <Tab label="IGTV" {...a11yProps(1)} />
                  <Tab label="SAVED" {...a11yProps(2)} />
                  <Tab label="TAGGED" {...a11yProps(3)} />
                </Tabs>
              </AppBar>

              <TabPanel value={value} index={0}>
                <Photos myValues={myPosts} posterId={posterId} />
              </TabPanel>

              <TabPanel value={value} index={1}>
                <IGTV />
              </TabPanel>

              <TabPanel value={value} index={2}>
                <NoSavedPosts  />
              </TabPanel>

              <TabPanel value={value} index={3}>
                <Tags/>
              </TabPanel>
          </>
        ) : (
            <CircularProgress size="8rem" style={{marginLeft: '400px' , marginTop: '100px'}} />
        )
      }
        

      </>
    );
}
