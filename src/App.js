import 'typeface-roboto';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Main } from './Main';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

import './App.css';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const awesomeGradient = `linear-gradient(45deg, ${red['A700']} 30%, ${
  red[500]
} 90%)`;

const theme = createMuiTheme({
  palette: {
    primary: { main: red['A700'] },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        background: awesomeGradient,
      },
    },
    MuiButton: {
      raisedPrimary: {
        background: awesomeGradient,
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
