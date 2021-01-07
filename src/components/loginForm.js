import React, { Component } from 'react';
import {
  TextField,
  withStyles,
  Card,
  CardContent,
  CardActions,
  Modal,
  Button
} from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ClearIcon from '@material-ui/icons/Clear';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  modal: {
    display: 'flex',
    outline: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '100%',
    maxWidth: 600,
    maxHeight: "100%",
    overflow: "scroll"
  },
  modalCardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  formGroup: {
    border: 'solid', 
    padding: theme.spacing(1)
  }
});

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
    };

    // bindings
    this.handleOptionChange = this.handleOptionChange.bind(this)
  }

  componentDidMount() {
    const { id } = this.props

    if(id) {
      // only change state of id passed
      this.setState({
        id: id
      })
    }
  }

  // function handling submit of form
  handleSubmit = evt => {
    const { onLogin } = this.props
    const { id } = this.state;

    // execute parent function in questionaryManager
    onLogin(id)
    evt.preventDefault();
  };

  handleIdChange = evt => {
    this.setState({ 
      id: evt.target.value 
    });
  };

  render() {
    const { classes, history} = this.props;

    return (
      <Modal
        className={classes.modal}
        onClose={() => history.goBack()}
        open
      >
        <Card className={classes.modalCard}>
          <form onSubmit={this.handleSubmit}>
            <CardContent className={classes.modalCardContent}>
              <TextField
                required 
                type="text"
                key="inputUseCase"
                placeholder="Use Case Name"
                label="Use Case Name"
                value={this.state.name}
                onChange={this.handleUseCaseNameChange}
                variant="outlined"
                size="small"
                autoFocus 
              />
           
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" type="submit"><SaveAltIcon/>Save</Button>
              <Button size="small" onClick={() => history.goBack()}><ClearIcon/>Cancel</Button>
            </CardActions>
          </form>
        </Card>
    </Modal>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(LoginForm);