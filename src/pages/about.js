import React, { Component, Fragment  } from 'react';
import { withRouter } from 'react-router-dom';
import {
  withStyles,
  Typography,
} from '@material-ui/core';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';

import ErrorSnackbar from '../components/errorSnackbar';

const styles = theme => ({
});

class About extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
  }

  async fetch(method, endpoint, body) {
    try {
      const response = await fetch(`/api${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
      });

      return await response.json();
    } catch (error) {
      console.error(error);

      this.setState({ error });
    }
  }

  render() {
    const { classes } = this.props;
    const { t } = this.props;

    return (
      <Fragment>
        <Typography variant="h4">{t("placeholder")}</Typography>

        {this.state.error && (
          <ErrorSnackbar
            onClose={() => this.setState({ error: null })}
            message={this.state.error.message}
          />
        )}
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  withTranslation(),
)(About);