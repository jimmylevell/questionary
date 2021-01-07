import React, { Component, Fragment } from 'react';
import { withRouter, Route } from 'react-router-dom';
import {
  withStyles,
  Typography,
} from '@material-ui/core';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';

import ReCAPTCHA from "react-google-recaptcha";
import { captcha_site_key } from '../components/config';

import LoginForm from '../components/loginForm';
import ErrorSnackbar from '../components/errorSnackbar';

const styles = theme => ({
  useCase: {
    marginTop: theme.spacing(2),
    outline: 0,
  }
});
const DELAY = 1500;

class QuestionaryManager extends Component {
  constructor() {
    super();
    this.state = {
      // captcha states
      captureValue: "[empty]",
      captureLoad: false,
      captureExpired: "false",

      // general states
      loading: true,
      error: null,
    };

    this._reCaptchaRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ captureLoad: false });
    }, DELAY);

    if(this._reCaptchaRef.current) {
      this._reCaptchaRef.current.execute()
    }
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

  handleCaptchaChange = value => {
    this.setState({ 
      captureValue: value 
    });
    
    // if value is null recaptcha expired
    if (value === null) {
      this.setState({ 
        caputreExpired: true,
        captureLoad: true
      });
    } else {
      this.setState({
        captureExpired: false,
        captureLoad: true
      })
    }
  };

  render() {
    const { classes } = this.props;
    const { t } = this.props;

    return (
      <Fragment>
        <Typography variant="h4">{t("title")}</Typography>
        
        {this.state.captureExpired && (
          <ReCAPTCHA  
            ref={this._reCaptchaRef}
            sitekey={captcha_site_key}
            size="invisible"
            onChange={this.handleCaptchaChange}
          />
        )}

        <Route exact path="/questionary/:id" render={this.renderUseCaseEditor} />
        
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
)(QuestionaryManager);