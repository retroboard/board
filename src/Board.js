import React, { useState, useEffect } from 'react';
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

let service;

const Board = props => {
  const { classes } = props;
  const hash = props.match.params.hash;

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ text: '' });
  const [isReady, setIsReady] = useState(false);

  useEffect(
    async () => {
      const node = await ipfsService.getInstance();
      service = await postsService(hash, node);
      const subscription = service.posts.subscribe(posts => {
        setPosts(posts);
        setIsReady(true);
      });
      return () => {
        subscription.unsubscribe();
      };
    },
    [hash]
  );

  const handleChange = event => setNewPost({ text: event.target.value });

  const handlePostUpdate = post => service.add(post);

  const handleDeletePost = post => service.remove(post);

  const resetPost = () => setNewPost({ text: '' });

  const handleSubmit = async event => {
    event.preventDefault();
    await service.add(newPost);
    resetPost();
  };

  if (!isReady) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          id="post"
          label="Post"
          value={newPost.text}
          onChange={handleChange}
          margin="normal"
        />
      </form>

      <List className={classes.list}>
        {posts.map(post => (
          <ListItem key={post._id}>
            <Card post={post} onChange={handlePostUpdate} onDelete={handleDeletePost} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

Board.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles)(Board);
