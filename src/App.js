import 'typeface-roboto';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './pages/Home';
import Board from './pages/Board';
import { path } from 'ramda';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
          <HashRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/board/:hash" component={(props) => <Board key={path(['match', 'params', 'hash'], props)} {...props} />} />
            </Switch>
          </HashRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
