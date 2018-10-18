import 'typeface-roboto';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Main } from './Main';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';

const styles = {
  root: {
    flexGrow: 1,
  },
};



const theme = createMuiTheme({
  palette: {
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
      },
    },
    MuiButton: {
      raisedPrimary: {
      },
    },
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Main />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
