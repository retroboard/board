import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import ipfsService from './ipfsService';
import postsService from './postsService';

class Board extends React.Component {
  state = {
    posts: [],
    post: { text: '' },
  };

  componentWillMount() {
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

        <ul>
          {this.state.posts.map(post => <li key={post._id}>{post.text}</li>)}
        </ul>
      </div>
    );
  }
}

Board.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Board;
