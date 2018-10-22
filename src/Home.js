import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import uuid from 'uuid/v4';

class Home extends React.Component {
  state = {};

  handleCreate = () => {
    this.setState({ created: uuid() });
  };

  render() {
    if (this.state.created) {
      return (
        <Redirect
          to={{
            pathname: `/board/${this.state.created}`,
          }}
        />
      );
    }

    return (
      <div>
        <Button variant="raised" color="primary" onClick={this.handleCreate} data-automation="newBoardButton">
          New board
        </Button>
      </div>
    );
  }
}

Home.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Home;
