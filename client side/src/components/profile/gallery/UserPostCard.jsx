import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ModeCommentIcon from '@material-ui/icons/ModeComment';

const useStyles = makeStyles({
  root: {
    width: '250px',

  },
  media: {
    width: '100%',
    height: '150px'
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
    const { body , image , title } = props.post;

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
          <FavoriteBorderIcon/>
        </Button>
        <Button size="small" color="primary">
          <ModeCommentIcon/>
        </Button>
      </CardActions>
    </Card>
  );
}
