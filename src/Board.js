import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ipfsService from './ipfsService';
import postsService from './postsService';
import { withStyles } from '@material-ui/core/styles';
import Card from './Card';

const styles = {
  list: {
    maxWidth: '400px',
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

  handlePostUpdate =  post => this.service.add(post);

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
              <Card post={post} onChange={this.handlePostUpdate} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

Board.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles)(Board);
