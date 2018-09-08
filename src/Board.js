import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ipfsService from './ipfsService';
import postsService from './postsService';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  list: {
    maxWidth: '400px',
  },
  card: {
    minHeight: '80px',
    width: '100%',
  },
};

class Board extends React.Component {
  state = {
    posts: [],
    post: { text: '' },
  };

  componentDidMount() {
    this.loadPosts();
  }

  async loadPosts() {
    const hash = this.props.match.params.hash;
    const node = await ipfsService.getInstance();
    this.service = await postsService(hash, node);

    this.service.posts.subscribe(posts => {
      this.setState({ posts });
    });
  }

  handleChange = event => {
    const post = { text: event.target.value };
    this.setState({ post });
  };

  resetPost = () => {
    const post = { text: '' };
    this.setState({ post });
  };

  handleSubmit = async event => {
    event.preventDefault();
    await this.service.add(this.state.post);
    this.resetPost();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <TextField
            id="post"
            label="Post"
            value={this.state.post.text}
            onChange={this.handleChange}
            margin="normal"
          />
        </form>

        <List className={classes.list}>
          {this.state.posts.map(post => (
            <ListItem key={post._id}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography>{post.text}</Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

Board.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(Board);
