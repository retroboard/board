import React, { useState } from 'react';
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

const Card = props => {
  const { post, classes } = props;
  const [isEditing, setEditing] = useState(false);
  const [newText, setNewText] = useState('');

  const enterEditMode = () => setEditing(true);
  const handleChange = event => setNewText(event.target.value);
  const handleCancel = () => setEditing(false);

  const handleSave = () => {
    setEditing(false);
    if (props.onChange) {
      const post = { ...props.post, ...{ text: newText } };
      props.onChange(post);
    }
  };

  return (
    <MCard className={classes.container}>
      {!isEditing && (
        <CardHeader
          className={classes.header}
          action={
            <IconButton
              className={classes.edit}
              aria-label="Edit"
              data-automation="editButton"
              onClick={enterEditMode}
            >
              <Edit className={classes.editIcon} />
            </IconButton>
          }
        />
      )}
      <CardContent className={classes.content}>
        {!isEditing && (
          <Typography data-automation="text">{post.text}</Typography>
        )}

        {isEditing && (
          <TextField
            data-automation="textField"
            multiline
            className={classes.textField}
            margin="normal"
            variant="outlined"
            defaultValue={post.text}
            onChange={handleChange}
          />
        )}
      </CardContent>
      {isEditing && (
        <CardActions>
          <Button
            className={classes.actionButton}
            onClick={handleCancel}
            data-automation="cancel"
          >
            Cancel
          </Button>

          <Button
            className={classes.actionButton}
            onClick={handleSave}
            color="primary"
            data-automation="saveButton"
          >
            Save
          </Button>
        </CardActions>
      )}
    </MCard>
  );
};

Card.propTypes = {
  post: PropTypes.object.isRequired,
  classes: PropTypes.object,
  onChange: PropTypes.func,
};

export default withStyles(styles)(Card);
