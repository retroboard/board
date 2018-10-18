import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

const styles = {
  container: {
    minHeight: '80px',
    width: '100%',
  },
  content: {
    paddingBottom: 0,
  },
  header: {
    paddingBottom: 0,
    position: 'absolute',
    right: '15px',
    top: '-2px',
  },
  textField: {
    margin: 0,
    width: '100%',
  },
  editIcon: {
    fontSize: 14,
  },
  actionButton: {
    fontSize: '.5em',
    minHeight: '0',
  },
};

class Card extends React.Component {
  state = {
    isEditing: false,
  };

  enterEditMode = () => {
    this.setState({ isEditing: true });
  };

  handleSave = () => {
    this.setState({ isEditing: false });
    if (this.props.onChange) {
      const post = { ...this.props.post, ...{ text: this.state.newText } };
      this.props.onChange(post);
    }
  };

  handleChange = event => {
    const newText = event.target.value;
    this.setState({ newText });
  };

  handleCancel = () => {
    this.setState({ isEditing: false });
  };

  render() {
    const { post, classes } = this.props;

    return (
      <MCard className={classes.container}>
        {!this.state.isEditing && (
          <CardHeader
            className={classes.header}
            action={
              <IconButton
                className={classes.edit}
                aria-label="Edit"
                data-automation="editButton"
                onClick={this.enterEditMode}
              >
                <Edit className={classes.editIcon} />
              </IconButton>
            }
          />
        )}
        <CardContent className={classes.content}>
          {!this.state.isEditing && (
            <Typography data-automation="text">{post.text}</Typography>
          )}

          {this.state.isEditing && (
            <TextField
              data-automation="textField"
              multiline
              className={classes.textField}
              margin="normal"
              variant="outlined"
              defaultValue={post.text}
              onChange={this.handleChange}
            />
          )}
        </CardContent>
        {this.state.isEditing && (
          <CardActions>
            <Button
              className={classes.actionButton}
              onClick={this.handleCancel}
              data-automation="cancel"
            >
              Cancel
            </Button>

            <Button
              className={classes.actionButton}
              onClick={this.handleSave}
              color="primary"
              data-automation="saveButton"
            >
              Save
            </Button>
          </CardActions>
        )}
      </MCard>
    );
  }
}

Card.propTypes = {
  post: PropTypes.object.isRequired,
  classes: PropTypes.object,
  onChange: PropTypes.func,
};

export default withStyles(styles)(Card);
