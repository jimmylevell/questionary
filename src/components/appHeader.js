import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Typography,
  withStyles,
} from '@material-ui/core';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AvTimerIcon from '@material-ui/icons/AvTimer';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  text: {
    fontSize: '4.5em',
    color: '#f50057',
  },
  link: {
    fontSize: '1.5em',
    color: 'white',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textDecoration: 'none'
  },
  dropdown: {
    position: 'fixed',
    top: theme.spacing(1.5),
    right: theme.spacing(),
    color: 'white',
  },
  toolBar: {
    backgroundColor: "#a30d35",
    padding: theme.spacing(1)
  }
})

class AppHeader extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: false,
      lang: "en-US"
    }
  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    })
  };

  handleClose = (lang, event) => {
    const { i18n } = this.props

    this.setState({
      anchorEl: null,
      lang: lang
    })

    i18n.changeLanguage(lang);
  };

  render() {
    const { classes } = this.props;
    
    return (
    <AppBar position="static">
      <Toolbar className={classes.toolBar}>
        <Button color="inherit" component={Link} to="/">
          <AvTimerIcon/>
          <Typography variant="h6" color="inherit">
            Questionary 
          </Typography>
        </Button>

        {/* link collection */}
        <Link className={classes.link} to="/questionary">Home</Link>
        <Link className={classes.link} to="/about">About</Link>
      
        {/* language sidebar */}
        <Button aria-controls="language-menu" className={classes.dropdown} aria-haspopup="true" onClick={this.handleClick}>
          Change Language <ArrowDownwardIcon/>
        </Button>
        <Menu
          id="language-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem 
            selected={this.state.lang === "en-US"} 
            onClick={(event) => this.handleClose("en-US", event)}
          >English</MenuItem>
          <MenuItem 
            selected={this.state.lang === "en-US"} 
            onClick={(event) => this.handleClose("cs-CZ", event)}
          >Czechy</MenuItem>
        </Menu>
      
        <Route exact path="/help" render={this.renderHelp} />
      </Toolbar>
    </AppBar>
    )
  }
}

export default compose(
  withStyles(styles),
  withTranslation(),
)(AppHeader);