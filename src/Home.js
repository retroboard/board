import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import dbService from './dbService';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  state = {};

  handleCreate = async () => {
    const created = await dbService.createInstance();
    this.setState({ created });
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
        <Button variant="raised" color="primary" onClick={this.handleCreate}>
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
