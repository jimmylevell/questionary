import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';

import AppHeader from './appHeader';
import QuestionaryManager from '../pages/questionaryManager';
import About from '../pages/about';

const styles = theme => ({
  main: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.5),
    },
  },
});

const App = ({ classes }) => (
<Fragment>
    <CssBaseline />
    <AppHeader />
    <main className={classes.main}>
      <Route exact path="/" component={QuestionaryManager} />
      <Route exact path="/questionary" component={QuestionaryManager} />
      <Route exact path="/questionary/:id" component={QuestionaryManager} />
      <Route exact path="/about" render={About} />
    </main>
  </Fragment>
);

export default withStyles(styles)(App);